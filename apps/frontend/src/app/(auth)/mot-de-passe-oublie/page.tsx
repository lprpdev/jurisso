import type { Metadata } from 'next';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import styles from './page.module.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mot de passe oublié',
};

export default function MotDePasseOubliePage() {
  return (
    <>
      <h1 className={styles.heading}>Mot de passe oublié</h1>
      <p className={styles.subtitle}>
        Entrez votre adresse email, nous vous enverrons un lien de
        réinitialisation.
      </p>
      <ForgotPasswordForm />
      <p className={styles.backLink}>
        <Link href="/connexion">&larr;&nbsp;Retour à la connexion</Link>
      </p>
    </>
  );
}
