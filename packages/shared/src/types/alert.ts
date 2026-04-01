import type { SearchFilters } from './search';
import type { DocumentSummary } from './document';

/** Frequence de declenchement d'une alerte */
export type AlertFrequency = 'daily' | 'weekly';

/** Alerte de veille juridique */
export interface Alert {
  /** Identifiant unique */
  id: string;
  /** Identifiant de l'utilisateur */
  userId: string;
  /** Nom de l'alerte */
  name: string;
  /** Requete de recherche associee */
  query: string;
  /** Filtres de recherche */
  filters: SearchFilters;
  /** Frequence de declenchement */
  frequency: AlertFrequency;
  /** Alerte active ou en pause */
  isActive: boolean;
  /** Date du dernier declenchement (ISO 8601) */
  lastTriggered?: string;
  /** Date du prochain declenchement prevu (ISO 8601) */
  nextTrigger?: string;
  /** Date de creation (ISO 8601) */
  createdAt: string;
}

/** DTO de creation d'une alerte */
export interface CreateAlertDto {
  /** Nom de l'alerte */
  name: string;
  /** Requete de recherche */
  query: string;
  /** Filtres de recherche */
  filters?: SearchFilters;
  /** Frequence (defaut: daily) */
  frequency?: AlertFrequency;
}

/** DTO de mise a jour d'une alerte */
export interface UpdateAlertDto {
  /** Nom de l'alerte */
  name?: string;
  /** Requete de recherche */
  query?: string;
  /** Filtres de recherche */
  filters?: SearchFilters;
  /** Frequence */
  frequency?: AlertFrequency;
}

/** Resultat d'une alerte (nouveau document detecte) */
export interface AlertResult {
  /** Identifiant unique */
  id: string;
  /** Identifiant de l'alerte */
  alertId: string;
  /** Identifiant du document detecte */
  documentId: string;
  /** Resume du document */
  document?: DocumentSummary;
  /** Date d'envoi de la notification (ISO 8601) */
  sentAt: string;
}
