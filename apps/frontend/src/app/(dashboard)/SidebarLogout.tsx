'use client';

import styles from './layout.module.css';

export default function SidebarLogout() {
  return (
    <button
      className={styles.logoutBtn}
      onClick={async () => {
        await fetch('/api/logout', { method: 'POST' });
        window.location.href = '/auth/connexion';
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
      </svg>
      <span>Deconnexion</span>
    </button>
  );
}
