'use client';

import { useTransition, useState } from 'react';
import { toggleAlertAction, deleteAlertAction } from './actions';
import styles from './page.module.css';

interface Alert {
  id: string;
  name: string;
  query: string;
  frequency: string;
  active: boolean;
  lastTriggeredAt: string | null;
  createdAt: string;
}

const FREQUENCY_LABELS: Record<string, string> = {
  daily: 'Quotidien',
  weekly: 'Hebdomadaire',
  monthly: 'Mensuel',
};

export function AlertCard({ alert }: { alert: Alert }) {
  const [active, setActive] = useState(alert.active);
  const [isPending, startTransition] = useTransition();
  const [deleted, setDeleted] = useState(false);

  function handleToggle() {
    startTransition(async () => {
      await toggleAlertAction(alert.id, !active);
      setActive(!active);
    });
  }

  function handleDelete() {
    if (!confirm('Supprimer cette alerte ?')) return;
    startTransition(async () => {
      await deleteAlertAction(alert.id);
      setDeleted(true);
    });
  }

  if (deleted) return null;

  return (
    <div className={styles.alertCard}>
      <div className={styles.alertInfo}>
        <h2 className={styles.alertName}>{alert.name}</h2>
        <p className={styles.alertQuery}>{alert.query}</p>
        <div className={styles.alertMeta}>
          <span className={styles.frequencyBadge}>
            {FREQUENCY_LABELS[alert.frequency] ?? alert.frequency}
          </span>
          {alert.lastTriggeredAt && (
            <span>
              Dernier déclenchement :{' '}
              {new Date(alert.lastTriggeredAt).toLocaleDateString('fr-FR')}
            </span>
          )}
        </div>
      </div>

      <div className={styles.alertActions}>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={active}
            onChange={handleToggle}
            disabled={isPending}
          />
          <span className={styles.toggleSlider} />
        </label>
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={handleDelete}
          disabled={isPending}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
