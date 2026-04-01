'use client';

import styles from './Tag.module.css';

interface TagProps {
  label: string;
  onRemove?: () => void;
}

export function Tag({ label, onRemove }: TagProps) {
  return (
    <span className={styles.tag}>
      {label}
      {onRemove ? (
        <button
          type="button"
          className={styles.removeBtn}
          onClick={onRemove}
          aria-label={`Supprimer ${label}`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      ) : null}
    </span>
  );
}
