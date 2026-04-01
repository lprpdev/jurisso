import type { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { api } from '@/lib/api';
import { ProfileForm } from './ProfileForm';
import { PasswordForm } from './PasswordForm';
import { TwoFactorSection } from './TwoFactorSection';
import { DeleteAccountSection } from './DeleteAccountSection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Mon profil',
};

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  profession: string;
  barNumber?: string;
  plan: string;
  twoFactorEnabled: boolean;
}

export default async function ProfilPage() {
  const session = await auth();
  let profile: UserProfile | null = null;

  try {
    profile = await api<UserProfile>('/users/me');
  } catch {
    // Fallback to session data
  }

  const user = profile ?? {
    id: session?.user?.id ?? '',
    firstName: session?.user?.firstName ?? '',
    lastName: session?.user?.lastName ?? '',
    email: session?.user?.email ?? '',
    emailVerified: true,
    profession: session?.user?.profession ?? '',
    barNumber: undefined,
    plan: session?.user?.plan ?? 'free',
    twoFactorEnabled: false,
  };

  const planLabel =
    user.plan === 'pro'
      ? 'Pro'
      : user.plan === 'enterprise'
        ? 'Enterprise'
        : 'Gratuit';

  return (
    <>
      <h1 className={styles.title}>Mon profil</h1>

      <div className={styles.sections}>
        {/* ----- Personal Info ----- */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Informations personnelles</h2>
          <ProfileForm user={user} />
        </div>

        {/* ----- Password ----- */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Mot de passe</h2>
          <PasswordForm />
        </div>

        {/* ----- 2FA ----- */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Authentification à deux facteurs
          </h2>
          <TwoFactorSection enabled={user.twoFactorEnabled} />
        </div>

        {/* ----- Plan ----- */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Abonnement</h2>
          <div className={styles.planInfo}>
            <span className={styles.planName}>{planLabel}</span>
            <span
              className={`${styles.planBadge} ${user.plan === 'pro' ? styles.planBadgePro : ''}`}
            >
              {planLabel}
            </span>
          </div>
          {user.plan === 'free' ? (
            <button type="button" className={styles.upgradeBtn}>
              Passer au plan Pro
            </button>
          ) : (
            <a href="/api/stripe/portal" className={styles.manageLink}>
              Gérer mon abonnement&nbsp;&rarr;
            </a>
          )}
        </div>

        {/* ----- Danger Zone ----- */}
        <div className={styles.dangerSection}>
          <h2 className={styles.dangerTitle}>Zone de danger</h2>
          <p className={styles.dangerDescription}>
            La suppression de votre compte est irréversible. Toutes vos
            données, favoris, collections et annotations seront définitivement
            effacés.
          </p>
          <DeleteAccountSection userEmail={user.email} />
        </div>
      </div>
    </>
  );
}
