import styles from './Avatar.module.css';

interface AvatarProps {
  initials: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ initials, src, size = 'md' }: AvatarProps) {
  const classes = `${styles.avatar} ${styles[size]}`;

  return (
    <span className={classes} role="img" aria-label={initials}>
      {src ? (
        <img src={src} alt={initials} className={styles.image} />
      ) : (
        initials
      )}
    </span>
  );
}
