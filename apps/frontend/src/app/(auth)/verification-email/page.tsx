import type { Metadata } from 'next';
import { VerificationEmailContent } from './VerificationEmailContent';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Vérifiez votre email',
};

export default function VerificationEmailPage() {
  return (
    <div className={styles.container}>
      <svg
        className={styles.icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="4"
          y="14"
          width="56"
          height="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M4 14L32 36L60 14"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
        />
      </svg>
      <h1 className={styles.heading}>Vérifiez votre boîte mail</h1>
      <p className={styles.description}>
        Nous avons envoyé un email de vérification à votre adresse. Cliquez sur
        le lien pour activer votre compte.
      </p>
      <VerificationEmailContent />
    </div>
  );
}
