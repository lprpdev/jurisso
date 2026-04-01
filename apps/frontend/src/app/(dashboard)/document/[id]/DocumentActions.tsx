'use client';

import { useTransition, useState } from 'react';
import {
  toggleFavoriteAction,
  exportPdfAction,
} from './actions';
import styles from './page.module.css';

interface DocumentActionsProps {
  documentId: string;
  isFavorite: boolean;
}

export function DocumentActions({
  documentId,
  isFavorite: initialFavorite,
}: DocumentActionsProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  function handleToggleFavorite() {
    startTransition(async () => {
      await toggleFavoriteAction(documentId, isFavorite);
      setIsFavorite(!isFavorite);
    });
  }

  function handleCopyLink() {
    const url = `${window.location.origin}/document/${documentId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleExportPdf() {
    startTransition(async () => {
      const result = await exportPdfAction(documentId);
      if (result?.url) {
        window.open(result.url, '_blank');
      }
    });
  }

  return (
    <>
      <div className={styles.actionRow}>
        <button
          type="button"
          className={`${styles.actionBtn} ${isFavorite ? styles.actionBtnActive : ''}`}
          onClick={handleToggleFavorite}
          disabled={isPending}
        >
          <svg className={styles.actionIcon} viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1.5L9.8 5.2L14 5.7L11 8.6L11.7 12.8L8 10.8L4.3 12.8L5 8.6L2 5.7L6.2 5.2L8 1.5Z"
              stroke="currentColor"
              strokeWidth="1.2"
              fill={isFavorite ? 'currentColor' : 'none'}
            />
          </svg>
          {isFavorite ? 'Favori' : 'Ajouter'}
        </button>

        <button
          type="button"
          className={styles.actionBtn}
          onClick={handleCopyLink}
        >
          <svg className={styles.actionIcon} viewBox="0 0 16 16" fill="none">
            <path
              d="M6.5 9.5L9.5 6.5M5.5 11L3 13.5M13 3L10.5 5.5M7 4L4.5 1.5M12.5 9L15 11.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          {copied ? 'Copié !' : 'Partager'}
        </button>
      </div>

      <button
        type="button"
        className={styles.actionBtn}
        onClick={handleExportPdf}
        disabled={isPending}
        style={{ width: '100%' }}
      >
        <svg className={styles.actionIcon} viewBox="0 0 16 16" fill="none">
          <path
            d="M8 2V10M8 10L5 7M8 10L11 7M2 12V14H14V12"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Exporter PDF
      </button>
    </>
  );
}
