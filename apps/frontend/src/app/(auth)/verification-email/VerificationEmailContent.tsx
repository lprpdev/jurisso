'use client';

import { useState, useTransition } from 'react';
import { resendVerificationEmail } from './actions';
import Link from 'next/link';
import styles from './page.module.css';

export function VerificationEmailContent() {
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);

  function handleResend() {
    startTransition(async () => {
      const result = await resendVerificationEmail();
      if (result.success) {
        setSent(true);
        setTimeout(() => setSent(false), 5000);
      }
    });
  }

  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={styles.resendButton}
        onClick={handleResend}
        disabled={isPending || sent}
      >
        {sent ? 'Email renvoyé !' : isPending ? 'Envoi\u2026' : 'Renvoyer l\u2019email'}
      </button>
      {sent && (
        <span className={styles.successToast}>
          Un nouvel email a été envoyé.
        </span>
      )}
      <p className={styles.backLink}>
        <Link href="/connexion">Retour à la connexion</Link>
      </p>
    </div>
  );
}
