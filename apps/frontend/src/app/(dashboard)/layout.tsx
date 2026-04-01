import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { SidebarNav } from './SidebarNav';
import DashboardUserMenu from './DashboardUserMenu';
import DashboardPillTabs from './DashboardPillTabs';
import styles from './layout.module.css';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/connexion');
  }

  const { user } = session;
  const initials =
    (user.firstName?.[0] ?? '') + (user.lastName?.[0] ?? '');

  const planLabel =
    user.plan === 'pro'
      ? 'Pro'
      : user.plan === 'enterprise'
        ? 'Enterprise'
        : 'Gratuit';

  return (
    <div className={styles.shell}>
      {/* ----- Sidebar ----- */}
      <nav className={styles.sidebar} aria-label="Navigation principale">
        <div className={styles.sidebarHeader}>
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 21h18M3 7v1a4 4 0 004 4h10a4 4 0 004-4V7M12 12v9" />
            </svg>
          </div>
          <div>
            <Link href="/dashboard" className={styles.logoText}>JURISSO</Link>
            <p className={styles.logoSub}>Recherche juridique</p>
          </div>
        </div>

        <SidebarNav />

        <div className={styles.sidebarFooter}>
          <Link href="/recherche" className={styles.newSearchBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Nouvelle recherche</span>
          </Link>
        </div>
      </nav>

      {/* ----- Main Area ----- */}
      <main className={styles.mainArea}>
        {/* Floating Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <DashboardPillTabs />
          </div>

          <div className={styles.headerRight}>
            <form action="/recherche" method="get" className={styles.searchForm}>
              <div className={styles.searchInputWrapper}>
                <svg
                  className={styles.searchIcon}
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  name="q"
                  className={styles.searchInput}
                  placeholder="Rechercher\u2026"
                  autoComplete="off"
                />
              </div>
            </form>
            <button
              type="button"
              className={styles.notificationBtn}
              aria-label="Notifications"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M10 2C7.24 2 5 4.24 5 7V11L3 13V14H17V13L15 11V7C15 4.24 12.76 2 10 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 14V15C8 16.1 8.9 17 10 17C11.1 17 12 16.1 12 15V14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>

            <span className={styles.planBadge}>{planLabel}</span>

            <DashboardUserMenu
              initials={initials}
              firstName={user.firstName ?? ''}
              lastName={user.lastName ?? ''}
              plan={planLabel}
            />
          </div>
        </header>

        {/* Canvas */}
        <section className={styles.canvas}>
          <div className={styles.canvasInner}>
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}
