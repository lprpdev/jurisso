import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import * as argon2 from 'argon2';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../entities/user.entity';
import { RefreshToken } from '../../entities/refresh-token.entity';
import { EmailVerification } from '../../entities/email-verification.entity';
import { PasswordReset } from '../../entities/password-reset.entity';
import { AuditService } from '../audit/audit.service';
import { CacheService } from '../cache/cache.service';
import { EmailService } from '../email/email.service';
import { RegisterDto } from './dto/register.dto';

const ARGON2_OPTIONS: argon2.Options = {
  type: argon2.argon2id,
  memoryCost: 65536,
  timeCost: 3,
  parallelism: 4,
};

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
    @InjectRepository(EmailVerification)
    private readonly emailVerificationRepo: Repository<EmailVerification>,
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepo: Repository<PasswordReset>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly auditService: AuditService,
    private readonly cacheService: CacheService,
    private readonly emailService: EmailService,
  ) {}

  async register(dto: RegisterDto, ip: string, userAgent: string): Promise<User> {
    const existing = await this.userRepo.findOne({ where: { email: dto.email.toLowerCase() } });
    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    const passwordHash = await argon2.hash(dto.password, ARGON2_OPTIONS);

    const user = this.userRepo.create({
      email: dto.email.toLowerCase(),
      passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
      profession: dto.profession,
      barNumber: dto.barNumber || null,
      newsletter: dto.newsletter || false,
    });

    const savedUser = await this.userRepo.save(user);

    const verificationToken = uuidv4();
    const tokenHash = await argon2.hash(verificationToken, ARGON2_OPTIONS);

    const verification = this.emailVerificationRepo.create({
      userId: savedUser.id,
      tokenHash,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    await this.emailVerificationRepo.save(verification);

    await this.auditService.log({
      userId: savedUser.id,
      action: 'auth.register',
      entityType: 'user',
      entityId: savedUser.id,
      ipAddress: ip,
      userAgent,
    });

    this.logger.log(`User registered: ${savedUser.email}`);

    await this.emailService.sendVerificationEmail(
      savedUser.email,
      savedUser.firstName,
      verificationToken,
    );

    return savedUser;
  }

  async login(
    email: string,
    password: string,
    ip: string,
    userAgent: string,
  ): Promise<{
    accessToken?: string;
    refreshToken?: string;
    requires2FA?: boolean;
    tempToken?: string;
  }> {
    const user = await this.userRepo.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new UnauthorizedException(
        'Account is temporarily locked. Please try again later.',
      );
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const passwordValid = await argon2.verify(user.passwordHash, password);
    if (!passwordValid) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= 5) {
        user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
        user.failedLoginAttempts = 0;
      }
      await this.userRepo.save(user);

      await this.auditService.log({
        userId: user.id,
        action: 'auth.login_failed',
        ipAddress: ip,
        userAgent,
        details: { reason: 'invalid_password' },
      });

      throw new UnauthorizedException('Invalid email or password');
    }

    user.failedLoginAttempts = 0;
    user.lockedUntil = null;
    user.lastLoginAt = new Date();
    await this.userRepo.save(user);

    if (user.twoFactorEnabled) {
      const tempToken = this.jwtService.sign(
        { sub: user.id, type: '2fa_pending' },
        { expiresIn: '5m' },
      );
      return { requires2FA: true, tempToken };
    }

    const tokens = await this.generateTokens(user, ip, userAgent);

    // Send new device login alert (only if user opted in)
    if (user.notifyOnLogin) {
      const blockUrl = `${this.configService.get<string>('APP_URL', 'http://localhost:3000')}/parametres`;
      await this.emailService.sendNewDeviceLoginEmail(
        user.email,
        user.firstName,
        userAgent,
        ip,
        blockUrl,
      );
    }

    await this.auditService.log({
      userId: user.id,
      action: 'auth.login',
      ipAddress: ip,
      userAgent,
    });

    return tokens;
  }

  async generateTokens(
    user: User,
    ip: string,
    userAgent: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      plan: user.plan,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshTokenValue = uuidv4();
    const refreshTokenHash = await argon2.hash(refreshTokenValue, ARGON2_OPTIONS);

    const refreshToken = this.refreshTokenRepo.create({
      userId: user.id,
      tokenHash: refreshTokenHash,
      userAgent: userAgent.substring(0, 255),
      ipAddress: ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await this.refreshTokenRepo.save(refreshToken);

    return { accessToken, refreshToken: refreshTokenValue };
  }

  async verifyEmail(token: string): Promise<void> {
    const verifications = await this.emailVerificationRepo.find({
      where: { used: false, expiresAt: MoreThan(new Date()) },
    });

    let matchedVerification: EmailVerification | null = null;
    for (const v of verifications) {
      const valid = await argon2.verify(v.tokenHash, token);
      if (valid) {
        matchedVerification = v;
        break;
      }
    }

    if (!matchedVerification) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    matchedVerification.used = true;
    await this.emailVerificationRepo.save(matchedVerification);

    await this.userRepo.update(matchedVerification.userId, { emailVerified: true });

    const verifiedUser = await this.userRepo.findOne({ where: { id: matchedVerification.userId } });
    if (verifiedUser) {
      await this.emailService.sendWelcomeEmail(verifiedUser.email, verifiedUser.firstName);
    }

    await this.auditService.log({
      userId: matchedVerification.userId,
      action: 'auth.email_verified',
      entityType: 'user',
      entityId: matchedVerification.userId,
    });
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userRepo.findOne({ where: { email: email.toLowerCase() } });

    if (!user) {
      return;
    }

    const resetToken = uuidv4();
    const tokenHash = await argon2.hash(resetToken, ARGON2_OPTIONS);

    const passwordReset = this.passwordResetRepo.create({
      userId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });
    await this.passwordResetRepo.save(passwordReset);

    await this.auditService.log({
      userId: user.id,
      action: 'auth.password_reset_requested',
    });

    await this.emailService.sendPasswordResetEmail(user.email, user.firstName, resetToken);

    this.logger.log(`Password reset requested for ${user.email}`);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const resets = await this.passwordResetRepo.find({
      where: { used: false, expiresAt: MoreThan(new Date()) },
    });

    let matchedReset: PasswordReset | null = null;
    for (const r of resets) {
      const valid = await argon2.verify(r.tokenHash, token);
      if (valid) {
        matchedReset = r;
        break;
      }
    }

    if (!matchedReset) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const passwordHash = await argon2.hash(newPassword, ARGON2_OPTIONS);

    matchedReset.used = true;
    await this.passwordResetRepo.save(matchedReset);

    await this.userRepo.update(matchedReset.userId, { passwordHash });

    await this.refreshTokenRepo.update(
      { userId: matchedReset.userId, revoked: false },
      { revoked: true },
    );

    await this.auditService.log({
      userId: matchedReset.userId,
      action: 'auth.password_reset_completed',
    });
  }

  async refreshToken(
    token: string | undefined,
    ip: string,
    userAgent: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!token) {
      throw new UnauthorizedException('No refresh token provided');
    }

    const tokens = await this.refreshTokenRepo.find({
      where: { revoked: false, expiresAt: MoreThan(new Date()) },
      relations: ['user'],
    });

    let matchedToken: RefreshToken | null = null;
    for (const t of tokens) {
      const valid = await argon2.verify(t.tokenHash, token);
      if (valid) {
        matchedToken = t;
        break;
      }
    }

    if (!matchedToken || !matchedToken.user) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    matchedToken.revoked = true;
    await this.refreshTokenRepo.save(matchedToken);

    return this.generateTokens(matchedToken.user, ip, userAgent);
  }

  async logout(userId: string, refreshToken: string): Promise<void> {
    const tokens = await this.refreshTokenRepo.find({
      where: { userId, revoked: false },
    });

    for (const t of tokens) {
      const valid = await argon2.verify(t.tokenHash, refreshToken);
      if (valid) {
        t.revoked = true;
        await this.refreshTokenRepo.save(t);
        break;
      }
    }

    await this.auditService.log({
      userId,
      action: 'auth.logout',
    });
  }

  async setup2FA(userId: string): Promise<{
    qrCode: string;
    secret: string;
    backupCodes: string[];
  }> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.twoFactorEnabled) {
      throw new BadRequestException('2FA is already enabled');
    }

    const secret = speakeasy.generateSecret({
      name: `JURISSO:${user.email}`,
      issuer: 'JURISSO',
      length: 32,
    });

    const encryptionKey = this.configService.get<string>('ENCRYPTION_KEY');
    if (!encryptionKey) {
      throw new Error('ENCRYPTION_KEY is not configured');
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(encryptionKey, 'hex'),
      iv,
    );
    let encrypted = cipher.update(secret.base32, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const encryptedSecret = `${iv.toString('hex')}:${encrypted}`;

    const backupCodes: string[] = [];
    for (let i = 0; i < 8; i++) {
      backupCodes.push(crypto.randomBytes(8).toString('hex'));
    }

    const hashedBackupCodes: string[] = [];
    for (const code of backupCodes) {
      const hash = await argon2.hash(code, ARGON2_OPTIONS);
      hashedBackupCodes.push(hash);
    }

    user.twoFactorSecret = encryptedSecret;
    user.twoFactorBackupCodes = hashedBackupCodes;
    await this.userRepo.save(user);

    const qrCode = await QRCode.toDataURL(secret.otpauth_url!);

    await this.auditService.log({
      userId,
      action: 'auth.2fa_setup_initiated',
    });

    return { qrCode, secret: secret.base32, backupCodes };
  }

  async confirm2FA(userId: string, code: string): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.twoFactorSecret) {
      throw new BadRequestException('2FA setup not initiated');
    }

    const decryptedSecret = this.decryptSecret(user.twoFactorSecret);

    const verified = speakeasy.totp.verify({
      secret: decryptedSecret,
      encoding: 'base32',
      token: code,
      window: 1,
    });

    if (!verified) {
      throw new BadRequestException('Invalid 2FA code');
    }

    user.twoFactorEnabled = true;
    await this.userRepo.save(user);

    await this.emailService.sendTwoFAEnabledEmail(user.email, user.firstName);

    await this.auditService.log({
      userId,
      action: 'auth.2fa_enabled',
    });
  }

  async verify2FA(
    tempToken: string,
    code: string,
    ip: string,
    userAgent: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    let payload: { sub: string; type: string };
    try {
      payload = this.jwtService.verify(tempToken);
    } catch {
      throw new UnauthorizedException('Invalid or expired temporary token');
    }

    if (payload.type !== '2fa_pending') {
      throw new UnauthorizedException('Invalid token type');
    }

    const user = await this.userRepo.findOne({ where: { id: payload.sub } });
    if (!user || !user.twoFactorSecret) {
      throw new UnauthorizedException('User not found or 2FA not set up');
    }

    const decryptedSecret = this.decryptSecret(user.twoFactorSecret);

    const totpVerified = speakeasy.totp.verify({
      secret: decryptedSecret,
      encoding: 'base32',
      token: code,
      window: 1,
    });

    if (totpVerified) {
      const tokens = await this.generateTokens(user, ip, userAgent);
      await this.auditService.log({
        userId: user.id,
        action: 'auth.2fa_verified',
        ipAddress: ip,
        userAgent,
      });
      return tokens;
    }

    if (user.twoFactorBackupCodes && user.twoFactorBackupCodes.length > 0) {
      for (let i = 0; i < user.twoFactorBackupCodes.length; i++) {
        const valid = await argon2.verify(user.twoFactorBackupCodes[i], code);
        if (valid) {
          user.twoFactorBackupCodes.splice(i, 1);
          await this.userRepo.save(user);

          const tokens = await this.generateTokens(user, ip, userAgent);
          await this.auditService.log({
            userId: user.id,
            action: 'auth.2fa_backup_code_used',
            ipAddress: ip,
            userAgent,
            details: { remainingCodes: user.twoFactorBackupCodes.length },
          });
          return tokens;
        }
      }
    }

    throw new UnauthorizedException('Invalid 2FA code');
  }

  async disable2FA(userId: string, password: string, code: string): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.twoFactorEnabled || !user.twoFactorSecret) {
      throw new BadRequestException('2FA is not enabled');
    }

    const passwordValid = await argon2.verify(user.passwordHash, password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const decryptedSecret = this.decryptSecret(user.twoFactorSecret);

    const verified = speakeasy.totp.verify({
      secret: decryptedSecret,
      encoding: 'base32',
      token: code,
      window: 1,
    });

    if (!verified) {
      throw new BadRequestException('Invalid 2FA code');
    }

    user.twoFactorEnabled = false;
    user.twoFactorSecret = null;
    user.twoFactorBackupCodes = null;
    await this.userRepo.save(user);

    await this.auditService.log({
      userId,
      action: 'auth.2fa_disabled',
    });
  }

  async getProfile(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profession: user.profession,
      barNumber: user.barNumber,
      role: user.role,
      plan: user.plan,
      emailVerified: user.emailVerified,
      twoFactorEnabled: user.twoFactorEnabled,
      newsletter: user.newsletter,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
    };
  }

  async getSessions(userId: string) {
    const tokens = await this.refreshTokenRepo.find({
      where: { userId, revoked: false, expiresAt: MoreThan(new Date()) },
      order: { createdAt: 'DESC' },
    });

    return tokens.map((t) => ({
      id: t.id,
      userAgent: t.userAgent,
      ipAddress: t.ipAddress,
      createdAt: t.createdAt,
      expiresAt: t.expiresAt,
    }));
  }

  async revokeSession(userId: string, sessionId: string): Promise<void> {
    const token = await this.refreshTokenRepo.findOne({
      where: { id: sessionId, userId },
    });

    if (!token) {
      throw new NotFoundException('Session not found');
    }

    token.revoked = true;
    await this.refreshTokenRepo.save(token);

    await this.auditService.log({
      userId,
      action: 'auth.session_revoked',
      details: { sessionId },
    });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return null;
    }

    const valid = await argon2.verify(user.passwordHash, password);
    return valid ? user : null;
  }

  private decryptSecret(encryptedSecret: string): string {
    const encryptionKey = this.configService.get<string>('ENCRYPTION_KEY');
    if (!encryptionKey) {
      throw new Error('ENCRYPTION_KEY is not configured');
    }

    const [ivHex, encrypted] = encryptedSecret.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(encryptionKey, 'hex'),
      iv,
    );
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
