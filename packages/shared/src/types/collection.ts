import type { DocumentSummary } from './document';

/** Collection de documents organisee par l'utilisateur */
export interface Collection {
  /** Identifiant unique */
  id: string;
  /** Identifiant de l'utilisateur proprietaire */
  userId: string;
  /** Nom de la collection */
  name: string;
  /** Description de la collection */
  description?: string;
  /** Collection publique ou privee */
  isPublic: boolean;
  /** Couleur d'affichage (code hexadecimal) */
  color?: string;
  /** Nombre de documents dans la collection */
  documentsCount?: number;
  /** Date de creation (ISO 8601) */
  createdAt: string;
  /** Date de derniere mise a jour (ISO 8601) */
  updatedAt: string;
}

/** DTO de creation d'une collection */
export interface CreateCollectionDto {
  /** Nom de la collection */
  name: string;
  /** Description */
  description?: string;
  /** Publique ou privee (defaut: false) */
  isPublic?: boolean;
  /** Couleur d'affichage */
  color?: string;
}

/** DTO de mise a jour d'une collection */
export interface UpdateCollectionDto {
  /** Nom de la collection */
  name?: string;
  /** Description */
  description?: string;
  /** Publique ou privee */
  isPublic?: boolean;
  /** Couleur d'affichage */
  color?: string;
}

/** Collection avec la liste de ses documents */
export interface CollectionWithDocuments extends Collection {
  /** Documents contenus dans la collection */
  documents: DocumentSummary[];
}
