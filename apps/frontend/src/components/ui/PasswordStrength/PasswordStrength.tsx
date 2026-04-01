'use client';

import styles from './PasswordStrength.module.css';

interface PasswordStrengthProps {
  password: string;
}

type Strength = 0 | 1 | 2 | 3 | 4;

function evaluateStrength(password: string): Strength {
  if (!password) return 0;

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 1) return 1;
  if (score <= 2) return 2;
  if (score <= 3) return 3;
  return 4;
}

const STRENGTH_CONFIG: Record<
  Strength,
  { label: string; segmentClass: string; labelClass: string }
> = {
  0: { label: '', segmentClass: '', labelClass: '' },
  1: { label: 'Faible', segmentClass: styles.weak, labelClass: styles.labelWeak },
  2: { label: 'Moyen', segmentClass: styles.fair, labelClass: styles.labelFair },
  3: { label: 'Fort', segmentClass: styles.strong, labelClass: styles.labelStrong },
  4: {
    label: 'Tres fort',
    segmentClass: styles.veryStrong,
    labelClass: styles.labelVeryStrong,
  },
};

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = evaluateStrength(password);
  const config = STRENGTH_CONFIG[strength];

  return (
    <div className={styles.wrapper} aria-label={`Force du mot de passe : ${config.label || 'aucune'}`}>
      <div className={styles.bar}>
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={`${styles.segment} ${i < strength ? config.segmentClass : ''}`}
          />
        ))}
      </div>
      {config.label ? (
        <span className={`${styles.label} ${config.labelClass}`}>
          {config.label}
        </span>
      ) : null}
    </div>
  );
}
