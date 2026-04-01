import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import { HistoryActions } from './HistoryActions';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Historique de recherche',
};

interface SearchHistoryItem {
  id: string;
  query: string;
  filters?: Record<string, string>;
  resultCount: number;
  createdAt: string;
}

export default async function HistoriquePage() {
  let history: SearchHistoryItem[] = [];

  try {
    history = await api<SearchHistoryItem[]>('/search/history');
  } catch {
    // Empty state
  }

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Historique de recherche</h1>
        {history.length > 0 && (
          <HistoryActions />
        )}
      </div>

      {history.length > 0 ? (
        <div className={styles.list}>
          {history.map((item) => (
            <div key={item.id} className={styles.historyItem}>
              <div className={styles.historyContent}>
                <div className={styles.queryText}>{item.query}</div>
                <div className={styles.historyMeta}>
                  {item.filters &&
                    Object.entries(item.filters).map(([key, value]) => (
                      <span key={key} className={styles.filterBadge}>
                        {value}
                      </span>
                    ))}
                  <span className={styles.resultCount}>
                    {item.resultCount} résultat
                    {item.resultCount !== 1 ? 's' : ''}
                  </span>
                  <span className={styles.historyDate}>
                    {new Date(item.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
              <div className={styles.historyActions}>
                <Link
                  href={`/recherche?q=${encodeURIComponent(item.query)}`}
                  className={styles.relaunchLink}
                >
                  Relancer
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>Aucun historique</h2>
          <p className={styles.emptyText}>
            Vos recherches apparaîtront ici.
          </p>
        </div>
      )}
    </>
  );
}
