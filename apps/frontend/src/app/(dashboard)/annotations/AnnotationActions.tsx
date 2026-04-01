'use client';

import { useTransition, useState } from 'react';
import { deleteAnnotationAction } from './actions';
import styles from './page.module.css';

export function AnnotationActions({
  annotationId,
}: {
  annotationId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [deleted, setDeleted] = useState(false);

  function handleDelete() {
    if (!confirm('Supprimer cette annotation ?')) return;
    startTransition(async () => {
      await deleteAnnotationAction(annotationId);
      setDeleted(true);
    });
  }

  if (deleted) return null;

  return (
    <div className={styles.actions}>
      <button type="button" className={styles.actionBtn}>
        Modifier
      </button>
      <button
        type="button"
        className={styles.deleteBtn}
        onClick={handleDelete}
        disabled={isPending}
      >
        Supprimer
      </button>
    </div>
  );
}
