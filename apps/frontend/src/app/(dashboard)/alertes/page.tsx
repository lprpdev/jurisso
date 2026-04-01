import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { AlertCard } from './AlertCard';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Mes alertes',
};

interface Alert {
  id: string;
  name: string;
  query: string;
  frequency: string;
  active: boolean;
  lastTriggeredAt: string | null;
  createdAt: string;
}

export default async function AlertesPage() {
  let alerts: Alert[] = [];

  try {
    alerts = await api<Alert[]>('/alerts');
  } catch {
    // Empty state
  }

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Mes alertes</h1>
        <button type="button" className={styles.newBtn}>
          + Nouvelle alerte
        </button>
      </div>

      {alerts.length > 0 ? (
        <div className={styles.alertList}>
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>Aucune alerte</h2>
          <p className={styles.emptyText}>
            Créez une alerte pour être notifié des nouvelles décisions
            correspondant à vos critères.
          </p>
        </div>
      )}
    </>
  );
}
