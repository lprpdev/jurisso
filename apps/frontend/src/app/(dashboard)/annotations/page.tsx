import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import { AnnotationActions } from './AnnotationActions';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Mes annotations',
};

interface AnnotationWithDoc {
  id: string;
  documentId: string;
  documentTitle: string;
  excerpt?: string;
  note: string;
  color: string;
  createdAt: string;
}

export default async function AnnotationsPage() {
  let annotations: AnnotationWithDoc[] = [];

  try {
    annotations = await api<AnnotationWithDoc[]>('/annotations');
  } catch {
    // Empty state
  }

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Mes annotations</h1>
      </div>

      {annotations.length > 0 ? (
        <div className={styles.list}>
          {annotations.map((ann) => (
            <div key={ann.id} className={styles.annotationCard}>
              <div className={styles.annotationHeader}>
                <span
                  className={styles.colorDot}
                  style={{ backgroundColor: ann.color }}
                />
                <Link
                  href={`/document/${ann.documentId}`}
                  className={styles.docLink}
                >
                  {ann.documentTitle}
                </Link>
              </div>
              {ann.excerpt && (
                <div className={styles.excerpt}>{ann.excerpt}</div>
              )}
              <p className={styles.noteText}>{ann.note}</p>
              <div className={styles.annotationFooter}>
                <span className={styles.date}>
                  {new Date(ann.createdAt).toLocaleDateString('fr-FR')}
                </span>
                <AnnotationActions annotationId={ann.id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>Aucune annotation</h2>
          <p className={styles.emptyText}>
            Ajoutez des annotations sur vos documents pour enrichir votre
            recherche juridique.
          </p>
        </div>
      )}
    </>
  );
}
