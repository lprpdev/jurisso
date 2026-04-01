'use client';

import { useTransition } from 'react';
import { removeFavoriteAction } from './actions';
import styles from './page.module.css';

export function RemoveFavoriteButton({ favoriteId }: { favoriteId: string }) {
  const [isPending, startTransition] = useTransition();

  function handleRemove() {
    startTransition(async () => {
      await removeFavoriteAction(favoriteId);
    });
  }

  return (
    <button
      type="button"
      className={styles.removeBtn}
      onClick={handleRemove}
      disabled={isPending}
      aria-label="Retirer des favoris"
    >
      {isPending ? '\u2026' : 'Retirer'}
    </button>
  );
}
