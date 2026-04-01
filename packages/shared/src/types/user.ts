/** Role d'un utilisateur dans la plateforme */
export type UserRole = 'user' | 'admin';

/** Plan d'abonnement */
export type UserPlan = 'free' | 'pro' | 'enterprise';

/** Profession juridique de l'utilisateur */
export type Profession =
  | 'avocat'
  | 'juriste_entreprise'
  | 'magistrat'
  | 'etudiant'
  | 'chercheur'
  | 'autre';

/** Utilisateur complet tel que stocke en base de donnees */
export interface User {
  /** Identifiant unique (UUID v4) */
  id: string;
  /** Adresse email unique */
  email: string;
  /** Prenom */
  firstName: string;
  /** Nom de famille */
  lastName: string;
  /** Role dans la plateforme */
  role: UserRole;
  /** Plan d'abonnement actif */
  plan: UserPlan;
  /** URL de l'avatar */
  avatarUrl: string | null;
  /** Profession juridique */
  profession: Profession;
  /** Numero de barreau (avocats) */
  barNumber: string | null;
  /** Email verifie */
  isVerified: boolean;
  /** Compte actif */
  isActive: boolean;
  /** Authentification a deux facteurs activee */
  twoFaEnabled: boolean;
  /** Date de derniere connexion (ISO 8601) */
  lastLoginAt: string | null;
  /** Date de creation du compte (ISO 8601) */
  createdAt: string;
  /** Date de derniere mise a jour (ISO 8601) */
  updatedAt: string;
}

/** Profil utilisateur pour l'affichage (sous-ensemble de User) */
export interface UserProfile {
  /** Identifiant unique (UUID v4) */
  id: string;
  /** Adresse email */
  email: string;
  /** Prenom */
  firstName: string;
  /** Nom de famille */
  lastName: string;
  /** Profession juridique */
  profession: Profession;
  /** Numero de barreau */
  barNumber: string | null;
  /** URL de l'avatar */
  avatarUrl: string | null;
  /** Plan d'abonnement */
  plan: UserPlan;
  /** Role */
  role: UserRole;
  /** Email verifie */
  isVerified: boolean;
  /** 2FA activee */
  twoFaEnabled: boolean;
}

/** DTO de mise a jour du profil */
export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  profession?: Profession;
  barNumber?: string;
  avatarUrl?: string;
}

/** DTO de changement de mot de passe */
export interface ChangePasswordDto {
  /** Mot de passe actuel */
  currentPassword: string;
  /** Nouveau mot de passe */
  newPassword: string;
  /** Confirmation du nouveau mot de passe */
  confirmPassword: string;
}
