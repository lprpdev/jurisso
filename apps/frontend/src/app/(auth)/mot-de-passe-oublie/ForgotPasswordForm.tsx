'use client';

import { useActionState } from 'react';
import {
  forgotPasswordAction,
  type ForgotPasswordState,
} from './actions';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import styles from './page.module.css';

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState<
    ForgotPasswordState,
    FormData
  >(forgotPasswordAction, {});

  if (state.success) {
    return (
      <div className={styles.successMessage}>
        Si un compte existe avec cette adresse, vous recevrez un email de
        réinitialisation.
      </div>
    );
  }

  return (
    <form action={formAction} className={styles.form}>
      {state.error && (
        <div className={styles.errorMessage}>{state.error}</div>
      )}

      <Input
        name="email"
        type="email"
        label="Adresse email"
        placeholder="jean.dupont@cabinet.fr"
        required
        autoComplete="email"
      />

      <Button
        type="submit"
        className={styles.submitButton}
        disabled={isPending}
      >
        {isPending ? 'Envoi en cours\u2026' : 'Envoyer le lien'}
      </Button>
    </form>
  );
}
