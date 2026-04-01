import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Mes collections',
};

interface Collection {
  id: string;
  name: string;
  description?: string;
  color: string;
  documentCount: number;
  isPublic: boolean;
  createdAt: string;
}

export default async function CollectionsPage() {
  let collections: Collection[] = [];

  try {
    collections = await api<Collection[]>('/collections');
  } catch {
    // Empty state
  }

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Mes collections</h1>
        <button type="button" className={styles.newBtn}>
          + Nouvelle collection
        </button>
      </div>

      {collections.length > 0 ? (
        <div className={styles.grid}>
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.id}`}
              className={styles.card}
            >
              <div className={styles.cardHeader}>
                <span
                  className={styles.colorDot}
                  style={{ backgroundColor: col.color }}
                />
                <span className={styles.cardName}>{col.name}</span>
              </div>
              {col.description && (
                <p className={styles.cardDescription}>{col.description}</p>
              )}
              <div className={styles.cardFooter}>
                <span>
                  {col.documentCount} document
                  {col.documentCount !== 1 ? 's' : ''}
                </span>
                <span>
                  {new Date(col.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
              {col.isPublic && (
                <div className={styles.cardFooter}>
                  <span>Partagée</span>
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>Aucune collection</h2>
          <p className={styles.emptyText}>
            Créez votre première collection pour organiser vos documents
            juridiques.
          </p>
        </div>
      )}
    </>
  );
}
