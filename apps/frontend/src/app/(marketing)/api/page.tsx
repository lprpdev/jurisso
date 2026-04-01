import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'API',
  description: 'Documentation de l\u2019API REST JURISSO pour integrer la recherche juridique dans vos applications.',
};

const ENDPOINTS = [
  {
    category: 'Authentification',
    description: 'Gerez l\u2019inscription, la connexion et les sessions utilisateur.',
    items: [
      { method: 'POST', path: '/api/auth/register', description: 'Creer un nouveau compte', auth: false },
      { method: 'POST', path: '/api/auth/login', description: 'Se connecter et obtenir un token JWT', auth: false },
      { method: 'POST', path: '/api/auth/refresh', description: 'Renouveler le token d\u2019acces', auth: false },
      { method: 'POST', path: '/api/auth/logout', description: 'Revoquer la session active', auth: true },
      { method: 'GET', path: '/api/auth/me', description: 'Obtenir le profil de l\u2019utilisateur connecte', auth: true },
    ],
  },
  {
    category: 'Recherche',
    description: 'Interrogez 3,2 millions de documents juridiques.',
    items: [
      { method: 'GET', path: '/api/search?q=...', description: 'Recherche plein-texte avec filtres', auth: true },
      { method: 'GET', path: '/api/search/suggest?q=...', description: 'Suggestions et autocompletion', auth: true },
      { method: 'GET', path: '/api/search/history', description: 'Historique de recherche', auth: true },
    ],
  },
  {
    category: 'Documents',
    description: 'Accedez aux decisions de justice et textes legislatifs.',
    items: [
      { method: 'GET', path: '/api/documents/:id', description: 'Obtenir un document complet', auth: true },
      { method: 'GET', path: '/api/documents/:id/related', description: 'Decisions citees et citantes', auth: true },
      { method: 'GET', path: '/api/documents/:id/export/pdf', description: 'Exporter au format PDF (Pro+)', auth: true },
    ],
  },
  {
    category: 'Favoris',
    description: 'Gerez vos documents favoris.',
    items: [
      { method: 'GET', path: '/api/favorites', description: 'Lister ses favoris', auth: true },
      { method: 'POST', path: '/api/favorites', description: 'Ajouter un favori', auth: true },
      { method: 'DELETE', path: '/api/favorites/:id', description: 'Retirer un favori', auth: true },
    ],
  },
  {
    category: 'Collections',
    description: 'Organisez vos documents en dossiers thematiques.',
    items: [
      { method: 'GET', path: '/api/collections', description: 'Lister ses collections', auth: true },
      { method: 'POST', path: '/api/collections', description: 'Creer une collection', auth: true },
      { method: 'GET', path: '/api/collections/:id', description: 'Obtenir une collection et ses documents', auth: true },
      { method: 'POST', path: '/api/collections/:id/documents', description: 'Ajouter un document a une collection', auth: true },
      { method: 'DELETE', path: '/api/collections/:id', description: 'Supprimer une collection', auth: true },
    ],
  },
  {
    category: 'Annotations',
    description: 'Annotez et commentez les documents.',
    items: [
      { method: 'GET', path: '/api/annotations', description: 'Lister ses annotations', auth: true },
      { method: 'POST', path: '/api/annotations', description: 'Creer une annotation', auth: true },
      { method: 'PATCH', path: '/api/annotations/:id', description: 'Modifier une annotation', auth: true },
      { method: 'DELETE', path: '/api/annotations/:id', description: 'Supprimer une annotation', auth: true },
    ],
  },
  {
    category: 'Alertes',
    description: 'Configurez des alertes sur vos criteres de veille.',
    items: [
      { method: 'GET', path: '/api/alerts', description: 'Lister ses alertes', auth: true },
      { method: 'POST', path: '/api/alerts', description: 'Creer une alerte', auth: true },
      { method: 'PATCH', path: '/api/alerts/:id/toggle', description: 'Activer/desactiver une alerte', auth: true },
      { method: 'DELETE', path: '/api/alerts/:id', description: 'Supprimer une alerte', auth: true },
    ],
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: 'var(--color-success)',
  POST: 'var(--color-accent)',
  PATCH: 'var(--color-warning)',
  DELETE: 'var(--color-error)',
  PUT: 'var(--color-warning)',
};

export default function ApiPage() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav className={styles.toc}>
          <span className={styles.tocTitle}>Endpoints</span>
          {ENDPOINTS.map((e) => (
            <a
              key={e.category}
              href={`#${e.category.toLowerCase()}`}
              className={styles.tocLink}
            >
              {e.category}
            </a>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>
        <h1 className={styles.heading}>API Reference</h1>
        <p className={styles.intro}>
          L&apos;API REST JURISSO vous permet d&apos;integrer la recherche
          juridique dans vos applications. Disponible avec le plan{' '}
          <strong>Enterprise</strong>.{' '}
          <Link href="/contact" className={styles.inlineLink}>
            Contactez-nous
          </Link>{' '}
          pour obtenir vos identifiants.
        </p>

        <section className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Informations generales</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Base URL</span>
              <code className={styles.code}>https://api.jurisso.fr</code>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Authentification</span>
              <code className={styles.code}>Authorization: Bearer &lt;token&gt;</code>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Format</span>
              <code className={styles.code}>application/json</code>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Rate limiting</span>
              <code className={styles.code}>100 requetes / minute</code>
            </div>
          </div>
        </section>

        <section className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Reponses</h2>
          <p className={styles.paragraph}>
            Toutes les reponses suivent le format :
          </p>
          <pre className={styles.codeBlock}>
{`{
  "success": true,
  "data": { ... },
  "message": "optional message"
}`}
          </pre>
          <p className={styles.paragraph}>
            En cas d&apos;erreur :
          </p>
          <pre className={styles.codeBlock}>
{`{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Description lisible de l'erreur",
  "statusCode": 400
}`}
          </pre>
        </section>

        {ENDPOINTS.map((section) => (
          <section
            key={section.category}
            id={section.category.toLowerCase()}
            className={styles.endpointSection}
          >
            <h2 className={styles.sectionTitle}>{section.category}</h2>
            <p className={styles.sectionDesc}>{section.description}</p>
            <div className={styles.endpoints}>
              {section.items.map((ep) => (
                <div key={`${ep.method}-${ep.path}`} className={styles.endpoint}>
                  <div className={styles.endpointHeader}>
                    <span
                      className={styles.method}
                      style={{ color: METHOD_COLORS[ep.method] ?? 'var(--color-ink)' }}
                    >
                      {ep.method}
                    </span>
                    <code className={styles.path}>{ep.path}</code>
                    {ep.auth && <span className={styles.authBadge}>Auth</span>}
                  </div>
                  <p className={styles.endpointDesc}>{ep.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Codes HTTP</h2>
          <div className={styles.httpCodes}>
            {[
              { code: '200', desc: 'Succes' },
              { code: '201', desc: 'Ressource creee' },
              { code: '400', desc: 'Requete invalide' },
              { code: '401', desc: 'Non authentifie' },
              { code: '403', desc: 'Acces refuse' },
              { code: '404', desc: 'Ressource introuvable' },
              { code: '429', desc: 'Trop de requetes' },
              { code: '500', desc: 'Erreur serveur' },
            ].map((c) => (
              <div key={c.code} className={styles.httpCode}>
                <code className={styles.codeInline}>{c.code}</code>
                <span className={styles.httpDesc}>{c.desc}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
