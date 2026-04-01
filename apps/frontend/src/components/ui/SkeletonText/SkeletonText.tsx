import styles from './SkeletonText.module.css';
interface SkeletonTextProps {
  lines?: number;
}
export default function SkeletonText({ lines = 3 }: SkeletonTextProps) {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className={styles.line} />
      ))}
    </div>
  );
}
