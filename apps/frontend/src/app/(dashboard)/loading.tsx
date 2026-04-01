import styles from './loading.module.css';

export default function DashboardLoading() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
        <div className={`${styles.skeleton} ${styles.skeletonSubtitle}`} />
      </div>
      <div className={styles.grid}>
        <div className={`${styles.skeleton} ${styles.skeletonCard}`} />
        <div className={`${styles.skeleton} ${styles.skeletonCard}`} />
        <div className={`${styles.skeleton} ${styles.skeletonCard}`} />
        <div className={`${styles.skeleton} ${styles.skeletonCardWide}`} />
        <div className={`${styles.skeleton} ${styles.skeletonCard}`} />
      </div>
    </div>
  );
}
