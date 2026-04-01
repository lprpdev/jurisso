import styles from './Badge.module.css';
interface BadgeProps {
  label: string;
  color?: 'accent' | 'success' | 'warning' | 'error' | 'muted';
  size?: 'sm' | 'md';
}
export default function Badge({ label, color = 'accent', size = 'md' }: BadgeProps) {
  const classes = `${styles.badge} ${styles[color]} ${styles[size]}`;
  return <span className={classes}>{label}</span>;
}
