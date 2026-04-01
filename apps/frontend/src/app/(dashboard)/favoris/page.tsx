import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import { RemoveFavoriteButton } from './RemoveFavoriteButton';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Mes favoris',
};

interface Favorite {
  id: string;
  documentId: string;
  title: string;
  type: string;
  date: string;
  note?: string;
  addedAt: string;
}

export default async function FavorisPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? '';
  const sort = params.sort ?? 'addedAt';

  let favorites: Favorite[] = [];

  try {
    const qs = new URLSearchParams({ sort, ...(query ? { q: query } : {}) });
    favorites = await api<Favorite[]>(`/favorites?${qs.toString()}`);
  } catch {
    // Empty state
  }

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Mes favoris</h1>
        <div className={styles.controls}>
          <form action="/favoris" method="get">
            <input
              type="search"
              name="q"
              className={styles.searchInput}
              placeholder="Rechercher dans les favoris\u2026"
              defaultValue={query}
            />
            {sort !== 'addedAt' && (
              <input type="hidden" name="sort" value={sort} />
            )}
          </form>
          <select
            className={styles.sortSelect}
            defaultValue={sort}
            aria-label="Trier par"
          >
            <option value="addedAt">Date d&apos;ajout</option>
            <option value="date">Date de décision</option>
            <option value="type">Type</option>
          </select>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className={styles.grid}>
          {favorites.map((fav) => (
            <div key={fav.id} className={styles.favCard}>
              <div className={styles.favContent}>
                <div className={styles.favType}>{fav.type}</div>
                <h2 className={styles.favTitle}>
                  <Link href={`/document/${fav.documentId}`}>
                    {fav.title}
                  </Link>
                </h2>
                {fav.note && (
                  <p className={styles.favNote}>{fav.note}</p>
                )}
                <div className={styles.favMeta}>
                  Ajouté le{' '}
                  {new Date(fav.addedAt).toLocaleDateString('fr-FR')}
                </div>
              </div>
              <RemoveFavoriteButton favoriteId={fav.id} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>Aucun favori</h2>
          <p className={styles.emptyText}>
            Ajoutez des documents à vos favoris pour les retrouver facilement.
          </p>
        </div>
      )}
    </>
  );
}
