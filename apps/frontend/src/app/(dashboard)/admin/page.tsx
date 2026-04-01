import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { AdminTabs } from './AdminTabs';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Administration',
};

export default async function AdminPage() {
  const session = await auth();

  if (session?.user?.role !== 'admin') {
    return (
      <div className={styles.unauthorized}>
        <h1 className={styles.unauthorizedTitle}>Accès refusé</h1>
        <p className={styles.unauthorizedText}>
          Vous n&apos;avez pas les droits nécessaires pour accéder à cette page.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className={styles.title}>Administration</h1>
      <AdminTabs />
    </>
  );
}
