import type { DocumentSummary } from './document';

/** Position d'une annotation dans le texte du document */
export interface AnnotationPosition {
  /** Offset de debut dans le texte */
  start: number;
  /** Offset de fin dans le texte */
  end: number;
  /** Ancre textuelle pour retrouver la position */
  textAnchor: string;
}

/** Annotation sur un document juridique */
export interface Annotation {
  /** Identifiant unique */
  id: string;
  /** Identifiant de l'utilisateur auteur */
  userId: string;
  /** Identifiant du document annote */
  documentId: string;
  /** Contenu de l'annotation */
  content: string;
  /** Position dans le texte (null si annotation globale) */
  position?: AnnotationPosition;
  /** Couleur de surlignage */
  color?: string;
  /** Annotation privee ou partagee */
  isPrivate: boolean;
  /** Date de creation (ISO 8601) */
  createdAt: string;
  /** Date de derniere mise a jour (ISO 8601) */
  updatedAt: string;
}

/** DTO de creation d'une annotation */
export interface CreateAnnotationDto {
  /** Identifiant du document */
  documentId: string;
  /** Contenu de l'annotation */
  content: string;
  /** Position dans le texte */
  position?: AnnotationPosition;
  /** Couleur de surlignage */
  color?: string;
  /** Annotation privee (defaut: true) */
  isPrivate?: boolean;
}

/** DTO de mise a jour d'une annotation */
export interface UpdateAnnotationDto {
  /** Contenu de l'annotation */
  content?: string;
  /** Couleur de surlignage */
  color?: string;
  /** Annotation privee ou partagee */
  isPrivate?: boolean;
}

/** Annotation avec le document associe */
export interface AnnotationWithDocument extends Annotation {
  /** Resume du document annote */
  document?: DocumentSummary;
}
