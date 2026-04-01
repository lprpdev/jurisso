'use client';

import { useTransition, useState } from 'react';
import { revokeSessionAction, revokeAllSessionsAction } from './actions';
import styles from './page.module.css';

interface Session {
  id: string;
  device: string;
  ip: string;
  lastActiveAt: string;
  current: boolean;
}

export function SessionsSection({
  sessions: initialSessions,
}: {
  sessions: Session[];
}) {
  const [sessions, setSessions] = useState(initialSessions);
  const [isPending, startTransition] = useTransition();

  function handleRevoke(sessionId: string) {
    startTransition(async () => {
      await revokeSessionAction(sessionId);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    });
  }

  function handleRevokeAll() {
    if (
      !confirm(
        'Révoquer toutes les sessions ? Vous serez déconnecté de tous les appareils.',
      )
    )
      return;
    startTransition(async () => {
      await revokeAllSessionsAction();
      setSessions((prev) => prev.filter((s) => s.current));
    });
  }

  return (
    <>
      <div className={styles.sessionList}>
        {sessions.map((session) => (
          <div key={session.id} className={styles.sessionItem}>
            <div className={styles.sessionInfo}>
              <span className={styles.sessionDevice}>
                {session.device}
                {session.current && (
                  <span className={styles.sessionCurrent}>
                    {' '}
                    (session actuelle)
                  </span>
                )}
              </span>
              <span className={styles.sessionMeta}>
                IP: {session.ip} &middot; Dernière activité :{' '}
                {new Date(session.lastActiveAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            {!session.current && (
              <button
                type="button"
                className={styles.revokeBtn}
                onClick={() => handleRevoke(session.id)}
                disabled={isPending}
              >
                Révoquer
              </button>
            )}
          </div>
        ))}
      </div>
      {sessions.length > 1 && (
        <button
          type="button"
          className={styles.revokeAllBtn}
          onClick={handleRevokeAll}
          disabled={isPending}
        >
          Révoquer toutes les autres sessions
        </button>
      )}
    </>
  );
}
