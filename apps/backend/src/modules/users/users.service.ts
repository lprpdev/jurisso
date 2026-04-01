import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User, UserPlan, UserRole } from '../../entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuditService } from '../audit/audit.service';

const ARGON2_OPTIONS: argon2.Options = {
  type: argon2.argon2id,
  memoryCost: 65536,
  timeCost: 3,
  parallelism: 4,
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly auditService: AuditService,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email: email.toLowerCase() } });
  }

  async getProfile(userId: string) {
    const user = await this.findById(userId);
    return this.sanitizeUser(user);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.findById(userId);

    if (dto.firstName !== undefined) user.firstName = dto.firstName;
    if (dto.lastName !== undefined) user.lastName = dto.lastName;
    if (dto.profession !== undefined) user.profession = dto.profession;
    if (dto.barNumber !== undefined) user.barNumber = dto.barNumber;
    if (dto.newsletter !== undefined) user.newsletter = dto.newsletter;

    const saved = await this.userRepo.save(user);

    await this.auditService.log({
      userId,
      action: 'user.profile_updated',
      entityType: 'user',
      entityId: userId,
    });

    return this.sanitizeUser(saved);
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.findById(userId);

    const valid = await argon2.verify(user.passwordHash, dto.currentPassword);
    if (!valid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    user.passwordHash = await argon2.hash(dto.newPassword, ARGON2_OPTIONS);
    await this.userRepo.save(user);

    await this.auditService.log({
      userId,
      action: 'user.password_changed',
      entityType: 'user',
      entityId: userId,
    });

    return { message: 'Password changed successfully' };
  }

  async deleteAccount(userId: string) {
    const user = await this.findById(userId);
    await this.userRepo.remove(user);

    await this.auditService.log({
      userId,
      action: 'user.account_deleted',
      entityType: 'user',
      entityId: userId,
    });

    return { message: 'Account deleted successfully' };
  }

  async exportData(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: [
        'favorites',
        'collections',
        'annotations',
        'alerts',
        'searchHistory',
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      profile: this.sanitizeUser(user),
      favorites: user.favorites,
      collections: user.collections,
      annotations: user.annotations,
      alerts: user.alerts,
      searchHistory: user.searchHistory,
      exportedAt: new Date().toISOString(),
    };
  }

  async findAll(page: number = 1, limit: number = 20) {
    const [users, total] = await this.userRepo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: users.map((u) => this.sanitizeUser(u)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async adminGetUser(userId: string) {
    const user = await this.findById(userId);
    return this.sanitizeUser(user);
  }

  async adminUpdatePlan(userId: string, plan: UserPlan) {
    const user = await this.findById(userId);
    user.plan = plan;
    const saved = await this.userRepo.save(user);

    await this.auditService.log({
      action: 'admin.plan_updated',
      entityType: 'user',
      entityId: userId,
      details: { plan },
    });

    return this.sanitizeUser(saved);
  }

  async adminUpdateRole(userId: string, role: UserRole) {
    const user = await this.findById(userId);

    if (user.role === UserRole.SUPER_ADMIN) {
      throw new ForbiddenException('Cannot modify super admin role');
    }

    user.role = role;
    const saved = await this.userRepo.save(user);

    await this.auditService.log({
      action: 'admin.role_updated',
      entityType: 'user',
      entityId: userId,
      details: { role },
    });

    return this.sanitizeUser(saved);
  }

  async adminDeleteUser(userId: string) {
    const user = await this.findById(userId);

    if (user.role === UserRole.SUPER_ADMIN) {
      throw new ForbiddenException('Cannot delete super admin');
    }

    await this.userRepo.remove(user);

    await this.auditService.log({
      action: 'admin.user_deleted',
      entityType: 'user',
      entityId: userId,
    });

    return { message: 'User deleted successfully' };
  }

  private sanitizeUser(user: User) {
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
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
