'use client';

import { useActionState, useState } from 'react';
import { deleteAccountAction, type DeleteAccountState } from './actions';
import Input from '@/components/ui/Input/Input';
import styles from './page.module.css';

export function DeleteAccountSection({ userEmail }: { userEmail: string }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [state, formAction, isPending] = useActionState<
    DeleteAccountState,
    FormData
  >(deleteAccountAction, {});

  if (!showConfirm) {
    return (
      <button
        type="button"
        className={styles.dangerBtn}
        onClick={() => setShowConfirm(true)}
      >
        Supprimer mon compte
      </button>
    );
  }

  return (
    <form action={formAction} className={styles.form}>
      <p className={styles.dangerDescription}>
        Pour confirmer, entrez votre adresse email ({userEmail}) et votre mot de
        passe.
      </p>

      <Input
        name="confirmEmail"
        type="email"
        label="Adresse email"
        placeholder={userEmail}
        required
      />

      <Input
        name="confirmPassword"
        type="password"
        label="Mot de passe"
        required
        autoComplete="current-password"
      />

      {state.error && <p className={styles.errorMessage}>{state.error}</p>}

      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <button
          type="submit"
          className={styles.dangerBtn}
          disabled={isPending}
        >
          {isPending ? 'Suppression\u2026' : 'Confirmer la suppression'}
        </button>
        <button
          type="button"
          className={styles.saveBtn}
          onClick={() => setShowConfirm(false)}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
