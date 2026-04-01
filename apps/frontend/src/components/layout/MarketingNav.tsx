import Link from 'next/link';
import { auth } from '@/lib/auth';
import MarketingNavUser from './MarketingNavUser';
import styles from './MarketingNav.module.css';

export default async function MarketingNav() {
  const session = await auth();

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        JURISSO
      </Link>
      <ul className={styles.links}>
        <li>
          <Link href="/fonctionnalites" className={styles.link}>
            Fonctionnalites
          </Link>
        </li>
        <li>
          <Link href="/tarifs" className={styles.link}>
            Tarifs
          </Link>
        </li>
        <li>
          <Link href="/a-propos" className={styles.link}>
            A propos
          </Link>
        </li>
        <li>
          <Link href="/blog" className={styles.link}>
            Blog
          </Link>
        </li>
      </ul>
      <div className={styles.right}>
        {session ? (
          <MarketingNavUser
            firstName={session.user.firstName}
            lastName={session.user.lastName}
            plan={session.user.plan}
          />
        ) : (
          <>
            <Link href="/auth/connexion" className={styles.login}>
              Connexion
            </Link>
            <Link href="/auth/inscription" className={styles.cta}>
              Essai gratuit
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
