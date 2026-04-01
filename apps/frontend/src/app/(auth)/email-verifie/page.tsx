import type { Metadata } from 'next';
import { EmailVerifiedRedirect } from './EmailVerifiedRedirect';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Email vérifié',
};

export default function EmailVerifiePage() {
  return (
    <div className={styles.container}>
      <svg
        className={styles.icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M20 32L28 40L44 24"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <h1 className={styles.heading}>Email vérifié avec succès !</h1>
      <p className={styles.description}>
        Votre compte est maintenant actif. Vous pouvez vous connecter et
        commencer vos recherches juridiques.
      </p>
      <p className={styles.redirectNote}>
        Redirection vers la page de connexion\u2026
      </p>
      <EmailVerifiedRedirect />
    </div>
  );
}
