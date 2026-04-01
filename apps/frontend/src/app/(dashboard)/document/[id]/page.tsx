import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import { DocumentActions } from './DocumentActions';
import styles from './page.module.css';

interface Document {
  id: string;
  title: string;
  type: string;
  jurisdiction: string;
  date: string;
  number: string;
  solution?: string;
  keywords: string[];
  summary: string;
  fullText: string;
  isFavorite: boolean;
}

interface Annotation {
  id: string;
  text: string;
  createdAt: string;
}

interface RelatedDoc {
  id: string;
  title: string;
  date: string;
  relation: 'cited' | 'citing';
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const doc = await api<Document>(`/documents/${id}`);
    return { title: doc.title };
  } catch {
    return { title: 'Document' };
  }
}

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let doc: Document;
  let annotations: Annotation[] = [];
  let related: RelatedDoc[] = [];

  try {
    [doc, annotations, related] = await Promise.all([
      api<Document>(`/documents/${id}`),
      api<Annotation[]>(`/documents/${id}/annotations`),
      api<RelatedDoc[]>(`/documents/${id}/related`),
    ]);
  } catch {
    return (
      <div className={styles.document}>
        <h1 className={styles.docTitle}>Document introuvable</h1>
        <p className={styles.summary}>
          Ce document n&apos;existe pas ou a été supprimé.
        </p>
      </div>
    );
  }

  const paragraphs = doc.fullText
    .split('\n')
    .filter((p) => p.trim().length > 0);

  const citedDocs = related.filter((r) => r.relation === 'cited');
  const citingDocs = related.filter((r) => r.relation === 'citing');

  return (
    <div className={styles.layout}>
      {/* ----- Document ----- */}
      <article className={styles.document}>
        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles.badgeAccent}`}>
            {doc.type}
          </span>
          <span className={styles.badge}>{doc.jurisdiction}</span>
        </div>

        <h1 className={styles.docTitle}>{doc.title}</h1>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            {new Date(doc.date).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className={styles.metaSeparator}>|</span>
          <span className={styles.metaItem}>
            N{'\u00B0'} {doc.number}
          </span>
          {doc.solution && (
            <>
              <span className={styles.metaSeparator}>|</span>
              <span className={styles.metaItem}>{doc.solution}</span>
            </>
          )}
        </div>

        {doc.keywords.length > 0 && (
          <div className={styles.keywords}>
            {doc.keywords.map((kw) => (
              <span key={kw} className={styles.keyword}>
                {kw}
              </span>
            ))}
          </div>
        )}

        <div className={styles.divider} />

        <h2 className={styles.sectionTitle}>Résumé</h2>
        <p className={styles.summary}>{doc.summary}</p>

        <div className={styles.divider} />

        <h2 className={styles.sectionTitle}>Texte intégral</h2>
        <div className={styles.fullText}>
          {paragraphs.map((text, i) => (
            <div key={i} className={styles.paragraph}>
              <span className={styles.paragraphNumber}>{i + 1}</span>
              <p className={styles.paragraphText}>{text}</p>
            </div>
          ))}
        </div>
      </article>

      {/* ----- Side Panel ----- */}
      <aside className={styles.sidePanel}>
        {/* Actions */}
        <div className={styles.sidePanelSection}>
          <DocumentActions
            documentId={doc.id}
            isFavorite={doc.isFavorite}
          />
        </div>

        {/* Annotations */}
        <div className={styles.sidePanelSection}>
          <h3 className={styles.sidePanelTitle}>Annotations</h3>
          {annotations.length > 0 ? (
            <div className={styles.annotationList}>
              {annotations.map((ann) => (
                <div key={ann.id} className={styles.annotationItem}>
                  <p className={styles.annotationText}>{ann.text}</p>
                  <span className={styles.annotationDate}>
                    {new Date(ann.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyNote}>Aucune annotation</p>
          )}
          <button type="button" className={styles.addNoteBtn}>
            + Ajouter une note
          </button>
        </div>

        {/* Related */}
        {(citedDocs.length > 0 || citingDocs.length > 0) && (
          <div className={styles.sidePanelSection}>
            {citedDocs.length > 0 && (
              <>
                <h3 className={styles.sidePanelTitle}>Décisions citées</h3>
                <div className={styles.relatedList}>
                  {citedDocs.map((r) => (
                    <div key={r.id}>
                      <Link
                        href={`/document/${r.id}`}
                        className={styles.relatedLink}
                      >
                        {r.title}
                      </Link>
                      <div className={styles.relatedMeta}>
                        {new Date(r.date).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {citingDocs.length > 0 && (
              <>
                <h3 className={styles.sidePanelTitle}>Citée par</h3>
                <div className={styles.relatedList}>
                  {citingDocs.map((r) => (
                    <div key={r.id}>
                      <Link
                        href={`/document/${r.id}`}
                        className={styles.relatedLink}
                      >
                        {r.title}
                      </Link>
                      <div className={styles.relatedMeta}>
                        {new Date(r.date).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
