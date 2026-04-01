'use client';
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';
import styles from './Toast.module.css';
type ToastType = 'success' | 'error' | 'info' | 'warning';
interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  dismissing?: boolean;
}
interface ToastContextValue {
  toast: (type: ToastType, title: string, message?: string) => void;
}
const ToastContext = createContext<ToastContextValue | null>(null);
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}
interface ToastProviderProps {
  children: ReactNode;
}
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const counterRef = useRef(0);
  const removeToast = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, dismissing: true } : t)),
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 200);
  }, []);
  const toast = useCallback(
    (type: ToastType, title: string, message?: string) => {
      counterRef.current += 1;
      const id = `toast-${counterRef.current}`;
      setToasts((prev) => [...prev, { id, type, title, message }]);
      setTimeout(() => removeToast(id), 5000);
    },
    [removeToast],
  );
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className={styles.container} aria-live="polite" aria-relevant="additions">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`${styles.toast} ${styles[t.type]} ${t.dismissing ? styles.dismissing : ''}`}
            role="status"
          >
            <div className={styles.content}>
              <div className={styles.toastTitle}>{t.title}</div>
              {t.message ? (
                <div className={styles.toastMessage}>{t.message}</div>
              ) : null}
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => removeToast(t.id)}
              aria-label="Fermer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
