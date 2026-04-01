import type { Profession, UserProfile, UserRole, UserPlan } from './user';

/** DTO d'inscription */
export interface RegisterDto {
  /** Adresse email */
  email: string;
  /** Mot de passe */
  password: string;
  /** Confirmation du mot de passe */
  confirmPassword: string;
  /** Prenom */
  firstName: string;
  /** Nom de famille */
  lastName: string;
  /** Profession juridique */
  profession: Profession;
  /** Numero de barreau (optionnel, pour les avocats) */
  barNumber?: string;
  /** Acceptation des CGU (obligatoire) */
  acceptsCgu: boolean;
  /** Acceptation de la newsletter */
  acceptsNewsletter?: boolean;
}

/** DTO de connexion */
export interface LoginDto {
  /** Adresse email */
  email: string;
  /** Mot de passe */
  password: string;
}

/** Reponse de connexion reussie */
export interface LoginResponse {
  /** Token d'acces JWT */
  accessToken: string;
  /** Profil de l'utilisateur connecte */
  user: UserProfile;
}

/** Reponse lorsque la 2FA est requise */
export interface LoginRequires2FAResponse {
  /** Indique que la 2FA est requise */
  requires2FA: true;
  /** Token temporaire pour completer l'authentification 2FA */
  tempToken: string;
}

/** DTO de mot de passe oublie */
export interface ForgotPasswordDto {
  /** Adresse email du compte */
  email: string;
}

/** DTO de reinitialisation de mot de passe */
export interface ResetPasswordDto {
  /** Token de reinitialisation */
  token: string;
  /** Nouveau mot de passe */
  password: string;
  /** Confirmation du nouveau mot de passe */
  confirmPassword: string;
}

/** DTO de verification 2FA */
export interface Verify2FADto {
  /** Code TOTP a 6 chiffres */
  code: string;
  /** Token temporaire recu lors du login */
  tempToken: string;
}

/** Reponse de configuration de la 2FA */
export interface Setup2FAResponse {
  /** QR code en base64 pour l'application d'authentification */
  qrCode: string;
  /** Codes de secours a usage unique */
  backupCodes: string[];
}

/** Reponse de rafraichissement du token */
export interface RefreshResponse {
  /** Nouveau token d'acces JWT */
  accessToken: string;
}

/** Payload du JWT */
export interface JwtPayload {
  /** Identifiant de l'utilisateur (subject) */
  sub: string;
  /** Adresse email */
  email: string;
  /** Role de l'utilisateur */
  role: UserRole;
  /** Plan d'abonnement */
  plan: UserPlan;
  /** Timestamp d'emission (issued at) */
  iat: number;
  /** Timestamp d'expiration */
  exp: number;
}
