'use client';

import { useState, useEffect, useTransition } from 'react';
import styles from './page.module.css';

type TabId = 'users' | 'documents' | 'alerts' | 'logs' | 'metrics';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  plan: string;
  role: string;
  createdAt: string;
}

interface DocStats {
  total: number;
  byType: Record<string, number>;
  bySource: Record<string, number>;
  lastSync: string;
}

interface LogEntry {
  id: string;
  action: string;
  userId: string;
  userName: string;
  createdAt: string;
  details?: string;
}

interface Metrics {
  redisConnected: boolean;
  cacheHitRate: number;
  memoryUsage: string;
  uptime: string;
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'users', label: 'Utilisateurs' },
  { id: 'documents', label: 'Documents' },
  { id: 'alerts', label: 'Alertes' },
  { id: 'logs', label: 'Logs' },
  { id: 'metrics', label: 'Métriques' },
];

export function AdminTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [docStats, setDocStats] = useState<DocStats | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/admin/${activeTab}`);
        if (res.ok) {
          const data = await res.json();
          switch (activeTab) {
            case 'users':
              setUsers(data);
              break;
            case 'documents':
              setDocStats(data);
              break;
            case 'logs':
              setLogs(data);
              break;
            case 'metrics':
              setMetrics(data);
              break;
          }
        }
      } catch {
        // Handle error silently
      }
    }
    fetchData();
  }, [activeTab]);

  const filteredUsers = searchQuery
    ? users.filter(
        (u) =>
          u.email.includes(searchQuery) ||
          `${u.firstName} ${u.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      )
    : users;

  return (
    <>
      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.panel}>
        {/* ----- Users Tab ----- */}
        {activeTab === 'users' && (
          <>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Rechercher un utilisateur\u2026"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Plan</th>
                    <th>Rôle</th>
                    <th>Inscrit le</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        {user.firstName} {user.lastName}
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={`${styles.badge} ${
                            user.plan === 'pro' ? styles.badgeAccent : ''
                          }`}
                        >
                          {user.plan}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${styles.badge} ${
                            user.role === 'admin' ? styles.badgeWarning : ''
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>
                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td>
                        <select className={styles.actionSelect}>
                          <option value="">Actions</option>
                          <option value="plan_pro">Plan Pro</option>
                          <option value="plan_free">Plan Gratuit</option>
                          <option value="role_admin">Rôle Admin</option>
                          <option value="role_user">Rôle User</option>
                          <option value="delete">Supprimer</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ----- Documents Tab ----- */}
        {activeTab === 'documents' && docStats && (
          <>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statValue}>
                  {docStats.total.toLocaleString('fr-FR')}
                </div>
                <div className={styles.statLabel}>Total</div>
              </div>
              {Object.entries(docStats.byType).map(([type, count]) => (
                <div key={type} className={styles.statCard}>
                  <div className={styles.statValue}>
                    {count.toLocaleString('fr-FR')}
                  </div>
                  <div className={styles.statLabel}>{type}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)', marginBottom: 'var(--space-4)' }}>
              Dernière synchronisation :{' '}
              {new Date(docStats.lastSync).toLocaleString('fr-FR')}
            </p>
            <button type="button" className={styles.syncBtn}>
              Relancer la synchronisation
            </button>
          </>
        )}

        {/* ----- Alerts Tab ----- */}
        {activeTab === 'alerts' && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}>
            Vue d&apos;ensemble des alertes système.
          </p>
        )}

        {/* ----- Logs Tab ----- */}
        {activeTab === 'logs' && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Utilisateur</th>
                  <th>Détails</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td>
                      <span className={styles.badge}>{log.action}</span>
                    </td>
                    <td>{log.userName}</td>
                    <td>{log.details ?? '-'}</td>
                    <td>
                      {new Date(log.createdAt).toLocaleString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ----- Metrics Tab ----- */}
        {activeTab === 'metrics' && metrics && (
          <div className={styles.metricsList}>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Redis</span>
              <span className={styles.metricValue}>
                {metrics.redisConnected ? 'Connecté' : 'Déconnecté'}
              </span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Cache Hit Rate</span>
              <span className={styles.metricValue}>
                {(metrics.cacheHitRate * 100).toFixed(1)}%
              </span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Mémoire utilisée</span>
              <span className={styles.metricValue}>
                {metrics.memoryUsage}
              </span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Uptime</span>
              <span className={styles.metricValue}>{metrics.uptime}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
