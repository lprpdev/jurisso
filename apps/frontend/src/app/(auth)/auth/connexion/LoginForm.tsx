'use client';

import { useActionState } from 'react';
import { loginAction, type LoginState } from './actions';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import Link from 'next/link';
import styles from './page.module.css';

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    loginAction,
    {},
  );

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

      <div>
        <div className={styles.passwordHeader}>
          <label htmlFor="password">Mot de passe</label>
          <Link href="/auth/mot-de-passe-oublie" className={styles.forgotLink}>
            Mot de passe oublié ?
          </Link>
        </div>
        <Input
          name="password"
          id="password"
          type="password"
          placeholder="Votre mot de passe"
          required
          autoComplete="current-password"
        />
      </div>

      <Button
        type="submit"
        className={styles.submitButton}
        disabled={isPending}
      >
        {isPending ? 'Connexion en cours\u2026' : 'Se connecter'}
      </Button>
    </form>
  );
}
