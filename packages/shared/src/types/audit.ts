/** Actions tracees dans le journal d'audit */
export type AuditAction =
  | 'AUTH_LOGIN'
  | 'AUTH_LOGOUT'
  | 'AUTH_FAILED'
  | 'PASSWORD_CHANGED'
  | 'TWO_FA_ENABLED'
  | 'TWO_FA_DISABLED'
  | 'ACCOUNT_DELETED'
  | 'ACCOUNT_CREATED'
  | 'PROFILE_UPDATED'
  | 'ADMIN_USER_MODIFIED'
  | 'DOCUMENT_EXPORTED'
  | 'DATA_EXPORTED'
  | 'SEARCH_PERFORMED'
  | 'ALERT_CREATED'
  | 'ALERT_TRIGGERED';

/** Entree du journal d'audit */
export interface AuditLog {
  /** Identifiant unique */
  id: string;
  /** Identifiant de l'utilisateur (null pour les actions systeme) */
  userId?: string;
  /** Action effectuee */
  action: AuditAction;
  /** Type de ressource concernee (ex: user, document, alert) */
  resource?: string;
  /** Identifiant de la ressource concernee */
  resourceId?: string;
  /** Metadonnees supplementaires de l'action */
  metadata: Record<string, unknown>;
  /** Adresse IP de l'utilisateur */
  ipAddress?: string;
  /** User-Agent du navigateur */
  userAgent?: string;
  /** Date de l'action (ISO 8601) */
  createdAt: string;
}
