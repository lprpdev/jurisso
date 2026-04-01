/** Source du document juridique */
export type DocumentSource = 'legifrance' | 'judilibre' | 'dila';

/** Type de document juridique */
export type DocumentType =
  | 'decision'
  | 'loi'
  | 'decret'
  | 'ordonnance'
  | 'circulaire'
  | 'code'
  | 'article';

/** Solution d'une decision de justice */
export type DocumentSolution =
  | 'rejet'
  | 'cassation'
  | 'cassation_partielle'
  | 'irrecevabilite'
  | 'non_lieu'
  | 'autre';

/** Document juridique complet tel que stocke en base */
export interface Document {
  /** Identifiant unique interne (UUID v4) */
  id: string;
  /** Identifiant dans la source d'origine */
  externalId: string;
  /** Source du document */
  source: DocumentSource;
  /** Type de document */
  type: DocumentType;
  /** Titre du document */
  title: string;
  /** Juridiction (ex: Cour de cassation, Conseil d'Etat) */
  jurisdiction: string;
  /** Chambre (ex: Chambre civile 1) */
  chamber: string | null;
  /** Date de la decision (ISO 8601) */
  dateDecision: string | null;
  /** Date de publication (ISO 8601) */
  datePublication: string | null;
  /** Numero du document */
  number: string | null;
  /** Identifiant ECLI */
  ecli: string | null;
  /** Numero NOR */
  nor: string | null;
  /** Resume / sommaire */
  summary: string | null;
  /** Texte integral du document */
  fullText: string;
  /** Solution de la decision */
  solution: DocumentSolution | null;
  /** Matiere juridique (ex: droit civil, droit penal) */
  matter: string | null;
  /** Mots-cles associes */
  keywords: string[];
  /** URL de la source d'origine */
  urlSource: string | null;
  /** Metadonnees supplementaires */
  metadata: Record<string, unknown>;
  /** Date d'indexation dans le systeme (ISO 8601) */
  indexedAt: string;
  /** Date de creation de l'enregistrement (ISO 8601) */
  createdAt: string;
  /** Date de derniere mise a jour (ISO 8601) */
  updatedAt: string;
}

/** Resume d'un document pour affichage en carte */
export interface DocumentSummary {
  /** Identifiant unique */
  id: string;
  /** Type de document */
  type: DocumentType;
  /** Titre du document */
  title: string;
  /** Juridiction */
  jurisdiction: string;
  /** Chambre */
  chamber: string | null;
  /** Date de la decision (ISO 8601) */
  dateDecision: string | null;
  /** Numero du document */
  number: string | null;
  /** Identifiant ECLI */
  ecli: string | null;
  /** Resume */
  summary: string | null;
  /** Mots-cles */
  keywords: string[];
  /** Solution */
  solution: DocumentSolution | null;
  /** Matiere juridique */
  matter: string | null;
}

/** Resultat de recherche avec texte surligne */
export interface DocumentSearchResult extends DocumentSummary {
  /** Extrait du texte avec les termes de recherche surlignés */
  headline: string;
}
