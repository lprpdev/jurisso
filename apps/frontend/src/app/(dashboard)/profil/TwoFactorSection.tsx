'use client';

import { useState, useTransition } from 'react';
import { toggle2FAAction } from './actions';
import styles from './page.module.css';

export function TwoFactorSection({ enabled }: { enabled: boolean }) {
  const [isEnabled, setIsEnabled] = useState(enabled);
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      const result = await toggle2FAAction(!isEnabled);
      if (result.success) {
        setIsEnabled(!isEnabled);
      }
    });
  }

  return (
    <>
      <div className={styles.twoFAStatus}>
        <span className={isEnabled ? styles.statusActive : styles.statusInactive}>
          {isEnabled ? 'Activée' : 'Désactivée'}
        </span>
      </div>
      <button
        type="button"
        className={styles.twoFABtn}
        onClick={handleToggle}
        disabled={isPending}
      >
        {isPending
          ? 'Chargement\u2026'
          : isEnabled
            ? 'Désactiver la 2FA'
            : 'Activer la 2FA'}
      </button>
    </>
  );
}
