import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { api } from '@/lib/api';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Tableau de bord',
};

interface RecentSearch {
  id: string;
  query: string;
  createdAt: string;
}

interface Alert {
  id: string;
  name: string;
  newCount: number;
  lastTriggeredAt: string;
}

interface Favorite {
  id: string;
  documentId: string;
  title: string;
  type: string;
  note?: string;
}

interface Collection {
  id: string;
  name: string;
  color: string;
  documentCount: number;
}

interface DashboardStats {
  totalFavorites: number;
  activeAlerts: number;
  annotationsCount: number;
}

export default async function DashboardPage() {
  const session = await auth();
  const firstName = session?.user?.firstName ?? 'Utilisateur';

  let recentSearches: RecentSearch[] = [];
  let alerts: Alert[] = [];
  let favorites: Favorite[] = [];
  let collections: Collection[] = [];
  let stats: DashboardStats = {
    totalFavorites: 0,
    activeAlerts: 0,
    annotationsCount: 0,
  };

  try {
    [recentSearches, alerts, favorites, collections, stats] =
      await Promise.all([
        api<RecentSearch[]>('/search/history?limit=5'),
        api<Alert[]>('/alerts?limit=5'),
        api<Favorite[]>('/favorites?limit=3'),
        api<Collection[]>('/collections?limit=5'),
        api<DashboardStats>('/dashboard/stats'),
      ]);
  } catch {
    // Dashboard renders gracefully with empty data
  }

  const newAlertsCount = alerts.reduce((sum, a) => sum + a.newCount, 0);

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Tableau de bord</h1>
        <p className={styles.welcome}>Bonjour, {firstName}</p>
      </div>

      <div className={styles.grid}>
        {/* ----- Recent Searches ----- */}
        <div className={`${styles.widget} ${styles.widgetWide}`}>
          <h2 className={styles.widgetTitle}>Recherches récentes</h2>
          {recentSearches.length > 0 ? (
            <div className={styles.searchList}>
              {recentSearches.map((search) => (
                <div key={search.id} className={styles.searchItem}>
                  <span className={styles.searchQuery}>{search.query}</span>
                  <div className={styles.searchMeta}>
                    <span className={styles.searchDate}>
                      {new Date(search.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                    <Link
                      href={`/recherche?q=${encodeURIComponent(search.query)}`}
                      className={styles.relaunchLink}
                    >
                      Relancer
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyText}>Aucune recherche récente</p>
          )}
        </div>

        {/* ----- Alerts ----- */}
        <div className={styles.widget}>
          <h2 className={styles.widgetTitle}>
            Alertes
            {newAlertsCount > 0 && (
              <span className={styles.alertBadge}>{newAlertsCount}</span>
            )}
          </h2>
          {alerts.length > 0 ? (
            <div className={styles.alertList}>
              {alerts.map((alert) => (
                <div key={alert.id} className={styles.alertItem}>
                  {alert.name}
                  {alert.newCount > 0 && (
                    <span className={styles.alertBadge}>
                      {alert.newCount}
                    </span>
                  )}
                  <span className={styles.alertItemDate}>
                    {new Date(alert.lastTriggeredAt).toLocaleDateString(
                      'fr-FR',
                    )}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyText}>Aucune alerte active</p>
          )}
        </div>

        {/* ----- Favorites ----- */}
        <div className={styles.widget}>
          <h2 className={styles.widgetTitle}>Favoris récents</h2>
          {favorites.length > 0 ? (
            <div className={styles.favoritesGrid}>
              {favorites.map((fav) => (
                <Link
                  key={fav.id}
                  href={`/document/${fav.documentId}`}
                  className={styles.favoriteItem}
                >
                  <div className={styles.favoriteType}>{fav.type}</div>
                  {fav.title}
                </Link>
              ))}
            </div>
          ) : (
            <p className={styles.emptyText}>Aucun favori</p>
          )}
        </div>

        {/* ----- Collections ----- */}
        <div className={styles.widget}>
          <h2 className={styles.widgetTitle}>Collections</h2>
          {collections.length > 0 ? (
            <div className={styles.collectionList}>
              {collections.map((col) => (
                <Link
                  key={col.id}
                  href={`/collections/${col.id}`}
                  className={styles.collectionItem}
                >
                  <span
                    className={styles.collectionDot}
                    style={{ backgroundColor: col.color }}
                  />
                  <span className={styles.collectionName}>{col.name}</span>
                  <span className={styles.collectionCount}>
                    {col.documentCount} doc{col.documentCount !== 1 ? 's' : ''}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className={styles.emptyText}>Aucune collection</p>
          )}
        </div>

        {/* ----- Stats ----- */}
        <div className={styles.widget}>
          <h2 className={styles.widgetTitle}>Statistiques</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statBlock}>
              <div className={styles.statNumber}>{stats.totalFavorites}</div>
              <div className={styles.statLabel}>Favoris</div>
            </div>
            <div className={styles.statBlock}>
              <div className={styles.statNumber}>{stats.activeAlerts}</div>
              <div className={styles.statLabel}>Alertes</div>
            </div>
            <div className={styles.statBlock}>
              <div className={styles.statNumber}>
                {stats.annotationsCount}
              </div>
              <div className={styles.statLabel}>Annotations</div>
            </div>
          </div>
        </div>

        {/* ----- Quick Access ----- */}
        <div className={styles.widget}>
          <h2 className={styles.widgetTitle}>Accès rapide</h2>
          <div className={styles.quickGrid}>
            <Link
              href="/recherche?type=jurisprudence"
              className={styles.quickLink}
            >
              Jurisprudence
            </Link>
            <Link href="/recherche?type=codes" className={styles.quickLink}>
              Codes
            </Link>
            <Link href="/recherche?type=lois" className={styles.quickLink}>
              Lois
            </Link>
            <Link href="/recherche?type=decrets" className={styles.quickLink}>
              Décrets
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
