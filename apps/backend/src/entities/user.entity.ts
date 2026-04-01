import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Favorite } from './favorite.entity';
import { Collection } from './collection.entity';
import { Annotation } from './annotation.entity';
import { Alert } from './alert.entity';
import { SearchHistory } from './search-history.entity';
import { AuditLog } from './audit-log.entity';
import { RefreshToken } from './refresh-token.entity';
import { EmailVerification } from './email-verification.entity';
import { PasswordReset } from './password-reset.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export enum UserPlan {
  FREE = 'free',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
}

export enum UserProfession {
  AVOCAT = 'avocat',
  JURISTE = 'juriste',
  NOTAIRE = 'notaire',
  MAGISTRAT = 'magistrat',
  ETUDIANT = 'etudiant',
  ENSEIGNANT = 'enseignant',
  AUTRE = 'autre',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash!: string;

  @Column({ type: 'varchar', length: 100 })
  firstName!: string;

  @Column({ type: 'varchar', length: 100 })
  lastName!: string;

  @Column({ type: 'enum', enum: UserProfession, default: UserProfession.AUTRE })
  profession!: UserProfession;

  @Column({ type: 'varchar', length: 50, nullable: true })
  barNumber!: string | null;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @Column({ type: 'enum', enum: UserPlan, default: UserPlan.FREE })
  plan!: UserPlan;

  @Column({ type: 'boolean', default: false })
  emailVerified!: boolean;

  @Column({ type: 'boolean', default: false })
  twoFactorEnabled!: boolean;

  @Column({ type: 'text', nullable: true })
  twoFactorSecret!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  twoFactorBackupCodes!: string[] | null;

  @Column({ type: 'boolean', default: false })
  newsletter!: boolean;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt!: Date | null;

  @Column({ type: 'int', default: 0 })
  failedLoginAttempts!: number;

  @Column({ type: 'timestamp', nullable: true })
  lockedUntil!: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites!: Favorite[];

  @OneToMany(() => Collection, (collection) => collection.user)
  collections!: Collection[];

  @OneToMany(() => Annotation, (annotation) => annotation.user)
  annotations!: Annotation[];

  @OneToMany(() => Alert, (alert) => alert.user)
  alerts!: Alert[];

  @OneToMany(() => SearchHistory, (history) => history.user)
  searchHistory!: SearchHistory[];

  @OneToMany(() => AuditLog, (log) => log.user)
  auditLogs!: AuditLog[];

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens!: RefreshToken[];

  @OneToMany(() => EmailVerification, (ev) => ev.user)
  emailVerifications!: EmailVerification[];

  @OneToMany(() => PasswordReset, (pr) => pr.user)
  passwordResets!: PasswordReset[];
}
