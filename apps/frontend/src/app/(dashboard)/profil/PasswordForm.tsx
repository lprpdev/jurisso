'use client';

import { useActionState, useState } from 'react';
import { changePasswordAction, type PasswordState } from './actions';
import Input from '@/components/ui/Input/Input';
import PasswordStrength from '@/components/ui/PasswordStrength/PasswordStrength';
import styles from './page.module.css';

export function PasswordForm() {
  const [state, formAction, isPending] = useActionState<PasswordState, FormData>(
    changePasswordAction,
    {},
  );
  const [newPassword, setNewPassword] = useState('');

  return (
    <form action={formAction} className={styles.form}>
      <Input
        name="currentPassword"
        type="password"
        label="Mot de passe actuel"
        required
        autoComplete="current-password"
      />

      <div>
        <Input
          name="newPassword"
          type="password"
          label="Nouveau mot de passe"
          required
          autoComplete="new-password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <PasswordStrength password={newPassword} />
      </div>

      <Input
        name="confirmPassword"
        type="password"
        label="Confirmer le nouveau mot de passe"
        required
        autoComplete="new-password"
      />

      {state.success && (
        <p className={styles.successMessage}>
          Mot de passe modifié avec succès.
        </p>
      )}
      {state.error && <p className={styles.errorMessage}>{state.error}</p>}

      <button
        type="submit"
        className={styles.saveBtn}
        disabled={isPending}
      >
        {isPending ? 'Modification\u2026' : 'Changer le mot de passe'}
      </button>
    </form>
  );
}
