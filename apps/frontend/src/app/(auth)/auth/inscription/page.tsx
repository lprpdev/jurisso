import type { Metadata } from 'next';
import { RegisterForm } from './RegisterForm';
import styles from './page.module.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Inscription',
  description:
    'Créez votre compte JURISSO et accédez à toute la jurisprudence française.',
};

export default function InscriptionPage() {
  return (
    <>
      <h1 className={styles.heading}>Créer votre compte</h1>
      <p className={styles.subtitle}>
        Accédez à plus de 3,2 millions de décisions de justice
      </p>
      <RegisterForm />
      <p className={styles.footer}>
        Déjà un compte ?{' '}
        <Link href="/auth/connexion">Connexion&nbsp;&rarr;</Link>
      </p>
    </>
  );
}
