'use client';

import styles from './Alert.module.css';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  onClose?: () => void;
}

export function Alert({ type = 'info', title, message, onClose }: AlertProps) {
  const classes = `${styles.alert} ${styles[type]}`;

  return (
    <div className={classes} role="alert">
      <div className={styles.header}>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.message}>{message}</div>
        </div>
        {onClose ? (
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Fermer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}
