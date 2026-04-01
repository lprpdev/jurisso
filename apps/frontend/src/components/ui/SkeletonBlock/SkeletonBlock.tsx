import styles from './SkeletonBlock.module.css';
interface SkeletonBlockProps {
  width?: string;
  height?: string;
}
export default function SkeletonBlock({
  width = '100%',
  height = '120px',
}: SkeletonBlockProps) {
  return (
    <div
      className={styles.block}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
