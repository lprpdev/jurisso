'use client';

import { useState, useTransition } from 'react';
import { exportRGPDAction } from './actions';
import styles from './page.module.css';

export function ExportRGPD() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  function handleExport() {
    startTransition(async () => {
      const result = await exportRGPDAction();
      if (result.success) {
        setSuccess(true);
      }
    });
  }

  return (
    <>
      <button
        type="button"
        className={styles.exportBtn}
        onClick={handleExport}
        disabled={isPending || success}
      >
        {isPending
          ? 'Génération en cours\u2026'
          : success
            ? 'Export demandé'
            : 'Exporter mes données'}
      </button>
      {success && (
        <p className={styles.successMessage}>
          Votre export a été demandé. Vous recevrez un email lorsqu&apos;il
          sera prêt.
        </p>
      )}
    </>
  );
}
