'use client';

import type { DocumentSearchResult } from '@jurisso/shared';
import { Badge } from '@/components/ui/Badge/Badge';
import { Tag } from '@/components/ui/Tag/Tag';
import styles from './DocCard.module.css';

const TYPE_LABELS: Record<string, string> = {
  decision: 'Decision',
  loi: 'Loi',
  decret: 'Decret',
  ordonnance: 'Ordonnance',
  circulaire: 'Circulaire',
  code: 'Code',
  article: 'Article',
};

interface DocCardProps {
  decision: DocumentSearchResult;
  onFavorite?: (id: string) => void;
  onAddToCollection?: (id: string) => void;
  onShare?: (id: string) => void;
}

export function DocCard({
  decision,
  onFavorite,
  onAddToCollection,
  onShare,
}: DocCardProps) {
  const dateStr = decision.dateDecision
    ? new Date(decision.dateDecision).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <Badge label={TYPE_LABELS[decision.type] ?? decision.type} color="accent" size="sm" />
        <div className={styles.meta}>
          <span>{decision.jurisdiction}</span>
          {decision.chamber ? (
            <>
              <span className={styles.metaSep} aria-hidden="true" />
              <span>{decision.chamber}</span>
            </>
          ) : null}
          {dateStr ? (
            <>
              <span className={styles.metaSep} aria-hidden="true" />
              <time dateTime={decision.dateDecision!}>{dateStr}</time>
            </>
          ) : null}
        </div>
      </div>

      {decision.number || decision.ecli ? (
        <div className={styles.number}>
          {decision.number ? `N\u00B0 ${decision.number}` : ''}
          {decision.number && decision.ecli ? ' \u2014 ' : ''}
          {decision.ecli ?? ''}
        </div>
      ) : null}

      <div className={styles.separator} />

      <div
        className={styles.summary}
        dangerouslySetInnerHTML={{ __html: decision.headline }}
      />

      {decision.keywords.length > 0 ? (
        <div className={styles.tags}>
          {decision.keywords.slice(0, 5).map((kw) => (
            <Tag key={kw} label={kw} />
          ))}
        </div>
      ) : null}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={() => onFavorite?.(decision.id)}
          aria-label="Ajouter aux favoris"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={() => onAddToCollection?.(decision.id)}
          aria-label="Ajouter a une collection"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            <line x1="12" y1="11" x2="12" y2="17" />
            <line x1="9" y1="14" x2="15" y2="14" />
          </svg>
        </button>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={() => onShare?.(decision.id)}
          aria-label="Partager"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </button>
      </div>
    </article>
  );
}
