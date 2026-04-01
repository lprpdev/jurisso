import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { SidebarNav } from './SidebarNav';
import DashboardUserMenu from './DashboardUserMenu';
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

  const planClass =
    user.plan === 'pro'
      ? styles.planBadgePro
      : user.plan === 'enterprise'
        ? styles.planBadgeEnterprise
        : '';

  const planLabel =
    user.plan === 'pro'
      ? 'Pro'
      : user.plan === 'enterprise'
        ? 'Enterprise'
        : 'Gratuit';

  return (
    <>
      {/* ----- Topbar ----- */}
      <header className={styles.topbar}>
        <Link href="/dashboard" className={styles.topbarLogo}>
          JURISSO
        </Link>

        <div className={styles.topbarSearch}>
          <form action="/recherche" method="get">
            <div className={styles.searchInputWrapper}>
              <svg
                className={styles.searchIcon}
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M11 11L14 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="search"
                name="q"
                className={styles.searchInput}
                placeholder="Rechercher jurisprudence, lois, codes\u2026"
                autoComplete="off"
              />
            </div>
          </form>
        </div>

        <div className={styles.topbarActions}>
          <button
            type="button"
            className={styles.notificationBtn}
            aria-label="Notifications"
          >
            <svg
              className={styles.notificationIcon}
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 2C7.24 2 5 4.24 5 7V11L3 13V14H17V13L15 11V7C15 4.24 12.76 2 10 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M8 14V15C8 16.1 8.9 17 10 17C11.1 17 12 16.1 12 15V14"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </button>

          <span className={`${styles.planBadge} ${planClass}`}>
            {planLabel}
          </span>

          <DashboardUserMenu
            initials={initials}
            firstName={user.firstName ?? ''}
            lastName={user.lastName ?? ''}
            plan={planLabel}
          />
        </div>
      </header>

      {/* ----- Sidebar ----- */}
      <nav className={styles.sidebar} aria-label="Navigation principale">
        <SidebarNav />
      </nav>

      {/* ----- Main Content ----- */}
      <main className={styles.main}>{children}</main>
    </>
  );
}
