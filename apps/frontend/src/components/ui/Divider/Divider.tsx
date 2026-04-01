import styles from './Divider.module.css';

interface DividerProps {
  label?: string;
}

export function Divider({ label }: DividerProps) {
  if (!label) {
    return <div className={styles.plain} role="separator" />;
  }

  return (
    <div className={styles.divider} role="separator">
      <div className={styles.line} />
      <span className={styles.label}>{label}</span>
      <div className={styles.line} />
    </div>
  );
}
