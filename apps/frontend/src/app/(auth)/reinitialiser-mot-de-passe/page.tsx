import type { Metadata } from 'next';
import { ResetPasswordForm } from './ResetPasswordForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Réinitialiser le mot de passe',
};

export default async function ReinitialiserMotDePassePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <>
        <h1 className={styles.heading}>Lien invalide</h1>
        <div className={styles.errorMessage}>
          Ce lien de réinitialisation est invalide ou a expiré. Veuillez
          demander un nouveau lien.
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className={styles.heading}>Réinitialiser le mot de passe</h1>
      <p className={styles.subtitle}>Choisissez un nouveau mot de passe sécurisé</p>
      <ResetPasswordForm token={token} />
    </>
  );
}
