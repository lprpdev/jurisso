'use client';
import styles from './Pagination.module.css';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  baseUrl?: string;
}
function getPageRange(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | 'ellipsis')[] = [1];
  if (current > 3) {
    pages.push('ellipsis');
  }
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (current < total - 2) {
    pages.push('ellipsis');
  }
  pages.push(total);
  return pages;
}
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  baseUrl,
}: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = getPageRange(currentPage, totalPages);
  function renderPageButton(page: number) {
    const isActive = page === currentPage;
    const classes = `${styles.btn} ${isActive ? styles.active : ''}`;
    if (baseUrl && !onPageChange) {
      return (
        <a
          key={page}
          href={`${baseUrl}?page=${page}`}
          className={classes}
          aria-current={isActive ? 'page' : undefined}
          aria-label={`Page ${page}`}
        >
          {page}
        </a>
      );
    }
    return (
      <button
        key={page}
        type="button"
        className={classes}
        onClick={() => onPageChange?.(page)}
        aria-current={isActive ? 'page' : undefined}
        aria-label={`Page ${page}`}
      >
        {page}
      </button>
    );
  }
  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.btn}
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Page precedente"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      {pages.map((page, i) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className={styles.ellipsis} aria-hidden="true">
            ...
          </span>
        ) : (
          renderPageButton(page)
        ),
      )}
      <button
        type="button"
        className={styles.btn}
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Page suivante"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </nav>
  );
}
