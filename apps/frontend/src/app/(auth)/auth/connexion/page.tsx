import type { Metadata } from 'next';
import { LoginForm } from './LoginForm';
import styles from './page.module.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre compte JURISSO.',
};

export default function ConnexionPage() {
  return (
    <>
      <h1 className={styles.heading}>Connexion</h1>
      <p className={styles.subtitle}>
        Accédez à votre espace de recherche juridique
      </p>
      <LoginForm />
      <p className={styles.footer}>
        Pas de compte ?{' '}
        <Link href="/auth/inscription">Inscription gratuite&nbsp;&rarr;</Link>
      </p>
    </>
  );
}
