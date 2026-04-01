'use client';

import { useActionState, useState } from 'react';
import { resetPasswordAction, type ResetPasswordState } from './actions';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import PasswordStrength from '@/components/ui/PasswordStrength/PasswordStrength';
import Link from 'next/link';
import styles from './page.module.css';

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction, isPending] = useActionState<
    ResetPasswordState,
    FormData
  >(resetPasswordAction, {});
  const [password, setPassword] = useState('');

  if (state.success) {
    return (
      <div className={styles.successMessage}>
        Votre mot de passe a été réinitialisé avec succès.
        <Link href="/connexion">Se connecter&nbsp;&rarr;</Link>
      </div>
    );
  }

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="token" value={token} />

      {state.error && (
        <div className={styles.errorMessage}>{state.error}</div>
      )}

      <div>
        <Input
          name="password"
          type="password"
          label="Nouveau mot de passe"
          placeholder="8 caractères minimum"
          required
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordStrength password={password} />
      </div>

      <Input
        name="confirmPassword"
        type="password"
        label="Confirmer le mot de passe"
        required
        autoComplete="new-password"
      />

      <Button
        type="submit"
        className={styles.submitButton}
        disabled={isPending}
      >
        {isPending ? 'Réinitialisation\u2026' : 'Réinitialiser'}
      </Button>
    </form>
  );
}
