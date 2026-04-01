import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Recherche',
};

interface SearchResult {
  id: string;
  title: string;
  type: string;
  jurisdiction?: string;
  date: string;
  number?: string;
  excerpt: string;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  totalPages: number;
}

const DOCUMENT_TYPES = [
  { value: 'jurisprudence', label: 'Jurisprudence' },
  { value: 'lois', label: 'Lois' },
  { value: 'decrets', label: 'Décrets' },
  { value: 'codes', label: 'Codes' },
  { value: 'circulaires', label: 'Circulaires' },
];

const JURISDICTIONS = [
  { value: 'cour_cassation', label: 'Cour de cassation' },
  { value: 'conseil_etat', label: 'Conseil d\u2019État' },
  { value: 'conseil_constitutionnel', label: 'Conseil constitutionnel' },
  { value: 'cours_appel', label: 'Cours d\u2019appel' },
  { value: 'tribunaux', label: 'Tribunaux' },
];

const POPULAR_SEARCHES = [
  'Responsabilité civile',
  'Droit du travail licenciement',
  'RGPD données personnelles',
  'Bail commercial résiliation',
  'Contrat de vente vice caché',
  'Divorce prestation compensatoire',
];

export default async function RecherchePage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    type?: string;
    jurisdiction?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const query = params.q ?? '';
  const currentPage = parseInt(params.page ?? '1', 10);
  const sort = params.sort ?? 'relevance';

  let data: SearchResponse = {
    results: [],
    total: 0,
    page: 1,
    totalPages: 0,
  };

  if (query) {
    try {
      const searchQuery = new URLSearchParams({
        q: query,
        page: String(currentPage),
        sort,
        ...(params.type ? { type: params.type } : {}),
        ...(params.jurisdiction ? { jurisdiction: params.jurisdiction } : {}),
      });
      data = await api<SearchResponse>(`/search?${searchQuery.toString()}`);
    } catch {
      // Render with empty results
    }
  }

  function buildUrl(overrides: Record<string, string>) {
    const base: Record<string, string> = { q: query };
    if (params.type) base.type = params.type;
    if (params.jurisdiction) base.jurisdiction = params.jurisdiction;
    if (sort !== 'relevance') base.sort = sort;
    const merged = { ...base, ...overrides };
    const qs = new URLSearchParams(merged).toString();
    return `/recherche?${qs}`;
  }

  return (
    <>
      {/* ----- Search Bar ----- */}
      <form action="/recherche" method="get" className={styles.searchBar}>
        <svg
          className={styles.searchIcon}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M13.5 13.5L18 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="search"
          name="q"
          className={styles.searchInput}
          placeholder="Rechercher jurisprudence, lois, textes\u2026"
          defaultValue={query}
          autoComplete="off"
        />
        {params.type && (
          <input type="hidden" name="type" value={params.type} />
        )}
        {params.jurisdiction && (
          <input
            type="hidden"
            name="jurisdiction"
            value={params.jurisdiction}
          />
        )}
      </form>

      {query ? (
        <div className={styles.content}>
          {/* ----- Filter Panel ----- */}
          <aside className={styles.filterPanel}>
            <h2 className={styles.filterTitle}>Filtres</h2>

            <div className={styles.filterGroup}>
              <h3 className={styles.filterGroupTitle}>Type de document</h3>
              {DOCUMENT_TYPES.map((dt) => (
                <label key={dt.value} className={styles.filterOption}>
                  <input
                    type="checkbox"
                    name="type"
                    value={dt.value}
                    defaultChecked={params.type === dt.value}
                  />
                  {dt.label}
                </label>
              ))}
            </div>

            <div className={styles.filterGroup}>
              <h3 className={styles.filterGroupTitle}>Juridiction</h3>
              {JURISDICTIONS.map((j) => (
                <label key={j.value} className={styles.filterOption}>
                  <input
                    type="checkbox"
                    name="jurisdiction"
                    value={j.value}
                    defaultChecked={params.jurisdiction === j.value}
                  />
                  {j.label}
                </label>
              ))}
            </div>
          </aside>

          {/* ----- Results ----- */}
          <div className={styles.resultsArea}>
            <div className={styles.resultsHeader}>
              <span className={styles.resultsCount}>
                {data.total} résultat{data.total !== 1 ? 's' : ''}
              </span>
              <select
                className={styles.sortSelect}
                defaultValue={sort}
                aria-label="Trier par"
              >
                <option value="relevance">Pertinence</option>
                <option value="date">Date</option>
              </select>
            </div>

            {data.results.length > 0 ? (
              <>
                <div className={styles.resultsList}>
                  {data.results.map((result) => (
                    <Link
                      key={result.id}
                      href={`/document/${result.id}`}
                      className={styles.resultCard}
                    >
                      <div className={styles.resultType}>{result.type}</div>
                      <h3 className={styles.resultTitle}>{result.title}</h3>
                      <p className={styles.resultExcerpt}>{result.excerpt}</p>
                      <div className={styles.resultMeta}>
                        {result.jurisdiction && (
                          <span>{result.jurisdiction}</span>
                        )}
                        <span>
                          {new Date(result.date).toLocaleDateString('fr-FR')}
                        </span>
                        {result.number && <span>N{'\u00B0'} {result.number}</span>}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {data.totalPages > 1 && (
                  <nav className={styles.pagination} aria-label="Pagination">
                    {Array.from({ length: data.totalPages }, (_, i) => i + 1)
                      .slice(
                        Math.max(0, currentPage - 3),
                        Math.min(data.totalPages, currentPage + 2),
                      )
                      .map((page) => (
                        <Link
                          key={page}
                          href={buildUrl({ page: String(page) })}
                          className={`${styles.pageLink} ${
                            page === currentPage ? styles.pageLinkActive : ''
                          }`}
                        >
                          {page}
                        </Link>
                      ))}
                  </nav>
                )}
              </>
            ) : (
              <div className={styles.emptyState}>
                <h2 className={styles.emptyTitle}>Aucun résultat</h2>
                <p className={styles.emptyText}>
                  Essayez de modifier vos termes de recherche ou vos filtres.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ----- No Query State ----- */
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>
            Lancez votre recherche juridique
          </h2>
          <p className={styles.emptyText}>
            Accédez à plus de 3,2 millions de décisions et 450 000 textes
            législatifs.
          </p>

          <div className={styles.popularSection}>
            <h3 className={styles.popularTitle}>Recherches populaires</h3>
            <div className={styles.popularList}>
              {POPULAR_SEARCHES.map((term) => (
                <Link
                  key={term}
                  href={`/recherche?q=${encodeURIComponent(term)}`}
                  className={styles.popularTag}
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
