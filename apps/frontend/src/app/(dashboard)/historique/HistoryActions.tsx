'use client';

import { useTransition } from 'react';
import { clearAllHistoryAction } from './actions';
import styles from './page.module.css';

export function HistoryActions() {
  const [isPending, startTransition] = useTransition();

  function handleClearAll() {
    if (
      !confirm(
        'Êtes-vous sûr de vouloir effacer tout votre historique de recherche ?',
      )
    )
      return;
    startTransition(async () => {
      await clearAllHistoryAction();
    });
  }

  return (
    <button
      type="button"
      className={styles.clearAllBtn}
      onClick={handleClearAll}
      disabled={isPending}
    >
      {isPending ? 'Suppression\u2026' : 'Effacer tout l\u2019historique'}
    </button>
  );
}
