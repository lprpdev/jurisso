import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import styles from './page.module.css';

interface CollectionDocument {
  id: string;
  title: string;
  type: string;
  date: string;
  number?: string;
}

interface CollectionDetail {
  id: string;
  name: string;
  description?: string;
  color: string;
  documents: CollectionDocument[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const col = await api<CollectionDetail>(`/collections/${id}`);
    return { title: col.name };
  } catch {
    return { title: 'Collection' };
  }
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let collection: CollectionDetail;

  try {
    collection = await api<CollectionDetail>(`/collections/${id}`);
  } catch {
    return (
      <div>
        <h1 className={styles.title}>Collection introuvable</h1>
      </div>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <Link href="/collections" className={styles.backLink}>
          &larr;&nbsp;Retour aux collections
        </Link>
        <div className={styles.titleRow}>
          <span
            className={styles.colorDot}
            style={{ backgroundColor: collection.color }}
          />
          <h1 className={styles.title}>{collection.name}</h1>
        </div>
        {collection.description && (
          <p className={styles.description}>{collection.description}</p>
        )}
        <div className={styles.actions}>
          <button type="button" className={styles.actionBtn}>
            Ajouter des documents
          </button>
          <button
            type="button"
            className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}
          >
            Modifier
          </button>
        </div>
      </div>

      <div className={styles.divider} />

      {collection.documents.length > 0 ? (
        <div className={styles.docList}>
          {collection.documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/document/${doc.id}`}
              className={styles.docCard}
            >
              <div className={styles.docType}>{doc.type}</div>
              <h2 className={styles.docTitle}>{doc.title}</h2>
              <div className={styles.docMeta}>
                {new Date(doc.date).toLocaleDateString('fr-FR')}
                {doc.number && <> &middot; N{'\u00B0'} {doc.number}</>}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>Cette collection est vide. Ajoutez des documents pour commencer.</p>
        </div>
      )}
    </>
  );
}
