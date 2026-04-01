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
  dateDecision: string | null;
  datePublication: string | null;
  reference: string | null;
  numberEcli: string | null;
  numberPourvoi: string | null;
  keywords: string[];
  themes: string[];
  summary: string | null;
  content: string;
  metadata: Record<string, unknown> | null;
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
    const doc = await api<Document>(`/api/documents/${id}`);
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
  let isFavorite = false;

  try {
    [doc, annotations, related, isFavorite] = await Promise.all([
      api<Document>(`/api/documents/${id}`),
      api<Annotation[]>(`/api/annotations?documentId=${id}`).catch(() => []),
      api<RelatedDoc[]>(`/api/documents/${id}/related`).catch(() => []),
      api<boolean>(`/api/favorites/check/${id}`).catch(() => false),
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

  const paragraphs = (doc.content || '')
    .split('\n')
    .filter((p) => p.trim().length > 0);

  const solution = doc.metadata?.solution as string | undefined;
  const date = doc.dateDecision || doc.datePublication;
  const number = doc.reference || doc.numberPourvoi || doc.numberEcli;
  const allKeywords = [...(doc.themes || []), ...(doc.keywords || [])];

  const citedDocs = related.filter((r) => r.relation === 'cited');
  const citingDocs = related.filter((r) => r.relation === 'citing');

  const displayTitle = doc.title.length > 150
    ? doc.title.substring(0, 150) + '\u2026'
    : doc.title;

  return (
    <div className={styles.layout}>
      {/* ----- Document ----- */}
      <article className={styles.document}>
        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles.badgeAccent}`}>
            {doc.type.toUpperCase()}
          </span>
          {doc.jurisdiction && (
            <span className={styles.badge}>{doc.jurisdiction.replace(/_/g, ' ')}</span>
          )}
        </div>

        <h1 className={styles.docTitle}>{displayTitle}</h1>

        <div className={styles.metaRow}>
          {date && (
            <span className={styles.metaItem}>
              {new Date(date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
          {number && (
            <>
              <span className={styles.metaSeparator}>|</span>
              <span className={styles.metaItem}>
                N{'\u00B0'} {number}
              </span>
            </>
          )}
          {solution && (
            <>
              <span className={styles.metaSeparator}>|</span>
              <span className={styles.metaItem}>{solution}</span>
            </>
          )}
        </div>

        {allKeywords.length > 0 && (
          <div className={styles.keywords}>
            {allKeywords.slice(0, 10).map((kw) => (
              <span key={kw} className={styles.keyword}>
                {kw}
              </span>
            ))}
          </div>
        )}

        <div className={styles.divider} />

        {doc.summary && (
          <>
            <h2 className={styles.sectionTitle}>Résumé</h2>
            <p className={styles.summary}>{doc.summary}</p>
            <div className={styles.divider} />
          </>
        )}

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
            isFavorite={isFavorite}
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
