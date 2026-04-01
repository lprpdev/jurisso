import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { SidebarNav } from './SidebarNav';
import DashboardUserMenu from './DashboardUserMenu';
import DashboardPillTabs from './DashboardPillTabs';
import SidebarLogout from './SidebarLogout';
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
          {/* Plan Card */}
          <div className={user.plan === 'free' ? styles.planCard : styles.planCardPro}>
            <div className={styles.planCardHeader}>
              <span className={styles.planCardLabel}>
                {planLabel}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            {user.plan === 'free' ? (
              <>
                <p className={styles.planCardText}>
                  Passez a Pro pour des recherches illimitees et des alertes intelligentes.
                </p>
                <Link href="/tarifs" className={styles.planCardBtn}>
                  Passer a Pro
                </Link>
              </>
            ) : (
              <p className={styles.planCardText}>
                Recherches illimitees, alertes, annotations et export PDF.
              </p>
            )}
          </div>

        </div>
      </nav>

      {/* ----- Main Area ----- */}
      <main className={styles.mainArea}>
        {/* Floating Header */}
        <header className={styles.header}>
          <DashboardPillTabs />

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
                placeholder="Rechercher dans les archives\u2026"
                autoComplete="off"
              />
            </div>
          </form>

          <div className={styles.headerRight}>
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
