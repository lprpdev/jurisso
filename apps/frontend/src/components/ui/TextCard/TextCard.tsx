import type { DocumentSearchResult } from '@jurisso/shared';
import { Badge } from '@/components/ui/Badge/Badge';
import { Tag } from '@/components/ui/Tag/Tag';
import styles from './TextCard.module.css';

const TYPE_LABELS: Record<string, string> = {
  loi: 'Loi',
  decret: 'Decret',
  ordonnance: 'Ordonnance',
  circulaire: 'Circulaire',
  code: 'Code',
  article: 'Article',
};

interface TextCardProps {
  article: DocumentSearchResult;
}

export function TextCard({ article }: TextCardProps) {
  const dateStr = article.dateDecision
    ? new Date(article.dateDecision).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <Badge
          label={TYPE_LABELS[article.type] ?? article.type}
          color="muted"
          size="sm"
        />
      </div>

      <h3 className={styles.title}>{article.title}</h3>

      <div className={styles.meta}>
        <span>{article.jurisdiction}</span>
        {dateStr ? (
          <>
            <span className={styles.metaSep} aria-hidden="true" />
            <time dateTime={article.dateDecision!}>{dateStr}</time>
          </>
        ) : null}
      </div>

      {article.number || article.ecli ? (
        <div className={styles.number}>
          {article.number ? `N\u00B0 ${article.number}` : ''}
          {article.number && article.ecli ? ' \u2014 ' : ''}
          {article.ecli ?? ''}
        </div>
      ) : null}

      <div className={styles.separator} />

      <div
        className={styles.summary}
        dangerouslySetInnerHTML={{ __html: article.headline }}
      />

      {article.keywords.length > 0 ? (
        <div className={styles.tags}>
          {article.keywords.slice(0, 5).map((kw) => (
            <Tag key={kw} label={kw} />
          ))}
        </div>
      ) : null}
    </article>
  );
}
