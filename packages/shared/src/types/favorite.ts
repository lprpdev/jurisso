import type { DocumentSummary } from './document';

/** Favori (document marque par l'utilisateur) */
export interface Favorite {
  /** Identifiant unique */
  id: string;
  /** Identifiant de l'utilisateur */
  userId: string;
  /** Identifiant du document */
  documentId: string;
  /** Resume du document (inclus en lecture) */
  document?: DocumentSummary;
  /** Note personnelle */
  note?: string;
  /** Date d'ajout aux favoris (ISO 8601) */
  createdAt: string;
}

/** DTO de creation d'un favori */
export interface CreateFavoriteDto {
  /** Identifiant du document a mettre en favori */
  documentId: string;
  /** Note personnelle optionnelle */
  note?: string;
}

/** DTO de mise a jour d'un favori */
export interface UpdateFavoriteDto {
  /** Note personnelle */
  note?: string;
}
