import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ExportRGPD } from './ExportRGPD';
import { SessionsSection } from './SessionsSection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Paramètres',
};

interface Session {
  id: string;
  device: string;
  ip: string;
  lastActiveAt: string;
  current: boolean;
}

export default async function ParametresPage() {
  let sessions: Session[] = [];

  try {
    sessions = await api<Session[]>('/users/me/sessions');
  } catch {
    // Empty state
  }

  return (
    <>
      <h1 className={styles.title}>Paramètres</h1>

      <div className={styles.sections}>
        {/* ----- Preferences ----- */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Préférences</h2>
          <div className={styles.form}>
            <div>
              <label className={styles.fieldLabel} htmlFor="langue">
                Langue
              </label>
              <select
                id="langue"
                className={styles.selectField}
                defaultValue="fr"
                disabled
              >
                <option value="fr">Français</option>
              </select>
            </div>
            <div>
              <label className={styles.fieldLabel} htmlFor="timezone">
                Fuseau horaire
              </label>
              <select
                id="timezone"
                className={styles.selectField}
                defaultValue="Europe/Paris"
              >
                <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                <option value="Europe/Brussels">
                  Europe/Bruxelles (UTC+1)
                </option>
                <option value="Europe/Zurich">Europe/Zurich (UTC+1)</option>
                <option value="America/Guadeloupe">
                  Guadeloupe (UTC-4)
                </option>
                <option value="Indian/Reunion">La Réunion (UTC+4)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ----- RGPD Export ----- */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Export RGPD</h2>
          <p className={styles.exportDescription}>
            Conformément au RGPD, vous pouvez demander l&apos;export de toutes
            vos données personnelles. L&apos;archive JSON sera générée et
            envoyée à votre adresse email.
          </p>
          <ExportRGPD />
        </div>

        {/* ----- Sessions ----- */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Sessions actives</h2>
          <SessionsSection sessions={sessions} />
        </div>

        {/* ----- Feedback ----- */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Feedback</h2>
          <p className={styles.feedbackText}>
            Une suggestion, un bug à signaler ? N&apos;hésitez pas à nous
            contacter à{' '}
            <a href="mailto:support@jurisso.fr">support@jurisso.fr</a>.
          </p>
        </div>

        {/* ----- Delete Account (redirect) ----- */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Supprimer le compte</h2>
          <Link href="/profil#danger" className={styles.redirectLink}>
            Accéder à la zone de danger dans Mon Profil&nbsp;&rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
