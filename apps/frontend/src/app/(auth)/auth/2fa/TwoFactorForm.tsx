'use client';

import { useActionState } from 'react';
import { verify2FAAction, type TwoFactorState } from './actions';
import TwoFactorInput from '@/components/ui/TwoFactorInput/TwoFactorInput';
import Button from '@/components/ui/Button/Button';
import Link from 'next/link';
import styles from './page.module.css';

export function TwoFactorForm() {
  const [state, formAction, isPending] = useActionState<TwoFactorState, FormData>(
    verify2FAAction,
    {},
  );

  return (
    <form action={formAction} className={styles.form}>
      {state.error && (
        <div className={styles.errorMessage}>{state.error}</div>
      )}

      <div className={styles.codeInputWrapper}>
        <TwoFactorInput name="code" />
      </div>

      <Link href="/2fa/backup" className={styles.backupLink}>
        Utiliser un code de secours&nbsp;&rarr;
      </Link>

      <Button
        type="submit"
        className={styles.submitButton}
        disabled={isPending}
      >
        {isPending ? 'Vérification\u2026' : 'Vérifier'}
      </Button>
    </form>
  );
}
