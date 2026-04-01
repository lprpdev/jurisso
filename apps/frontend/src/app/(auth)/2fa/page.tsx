import type { Metadata } from 'next';
import { TwoFactorForm } from './TwoFactorForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Vérification en deux étapes',
};

export default function TwoFactorPage() {
  return (
    <>
      <h1 className={styles.heading}>Vérification en deux étapes</h1>
      <p className={styles.subtitle}>
        Entrez le code à 6 chiffres de votre application d&apos;authentification
      </p>
      <TwoFactorForm />
    </>
  );
}
