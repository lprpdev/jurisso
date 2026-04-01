/** Reponse API generique en cas de succes */
export interface ApiResponse<T> {
  /** Indique le succes de l'operation */
  success: boolean;
  /** Donnees de la reponse */
  data: T;
  /** Message optionnel */
  message?: string;
}

/** Reponse API en cas d'erreur */
export interface ApiErrorResponse {
  /** Toujours false en cas d'erreur */
  success: false;
  /** Code d'erreur technique */
  error: string;
  /** Message d'erreur lisible */
  message: string;
  /** Code de statut HTTP */
  statusCode: number;
}

/** Reponse paginee generique */
export interface PaginatedResponse<T> {
  /** Donnees de la page courante */
  data: T[];
  /** Nombre total d'elements */
  total: number;
  /** Page courante */
  page: number;
  /** Nombre d'elements par page */
  limit: number;
  /** Nombre total de pages */
  totalPages: number;
}
