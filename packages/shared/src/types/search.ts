import type { DocumentType, DocumentSearchResult } from './document';

/** Filtres de recherche */
export interface SearchFilters {
  /** Types de documents */
  type?: DocumentType[];
  /** Juridiction */
  jurisdiction?: string;
  /** Matiere juridique */
  matter?: string;
  /** Solution de la decision */
  solution?: string;
  /** Date de debut (ISO 8601) */
  dateFrom?: string;
  /** Date de fin (ISO 8601) */
  dateTo?: string;
}

/** Parametres de recherche */
export interface SearchParams {
  /** Requete de recherche */
  q: string;
  /** Filtres optionnels */
  filters?: SearchFilters;
  /** Numero de page (commence a 1) */
  page?: number;
  /** Nombre de resultats par page */
  limit?: number;
  /** Critere de tri */
  sort?: 'relevance' | 'date_desc' | 'date_asc';
}

/** Reponse paginee de recherche */
export interface SearchResponse {
  /** Resultats de la recherche */
  results: DocumentSearchResult[];
  /** Nombre total de resultats */
  total: number;
  /** Page courante */
  page: number;
  /** Nombre de resultats par page */
  limit: number;
  /** Nombre total de pages */
  totalPages: number;
}

/** Suggestion de recherche (autocompletion) */
export interface SearchSuggestion {
  /** Texte de la suggestion */
  text: string;
  /** Type de suggestion */
  type: 'query' | 'jurisdiction' | 'keyword';
}

/** Element de l'historique de recherche */
export interface SearchHistoryItem {
  /** Identifiant unique */
  id: string;
  /** Requete effectuee */
  query: string;
  /** Filtres appliques */
  filters: SearchFilters;
  /** Nombre de resultats obtenus */
  resultsCount: number;
  /** Date de la recherche (ISO 8601) */
  createdAt: string;
}
