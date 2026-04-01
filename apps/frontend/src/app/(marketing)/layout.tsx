import MarketingNav from '@/components/layout/MarketingNav';
import MarketingFooter from '@/components/layout/MarketingFooter';
import styles from './layout.module.css';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <MarketingNav />
      <main className={styles.content}>
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
