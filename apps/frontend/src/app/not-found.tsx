import Link from 'next/link';

const nfStyles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100dvh',
    padding: '2rem',
    textAlign: 'center' as const,
    backgroundColor: 'var(--color-surface)',
  },
  code: {
    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
    fontSize: 'var(--text-6xl)',
    fontWeight: 900,
    color: 'var(--color-surface-2)',
    lineHeight: 1,
    marginBottom: 'var(--space-4)',
  },
  title: {
    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
    fontSize: 'var(--text-2xl)',
    fontWeight: 700,
    color: 'var(--color-ink)',
    marginBottom: 'var(--space-3)',
  },
  text: {
    fontSize: 'var(--text-base)',
    color: 'var(--color-muted)',
    maxWidth: 480,
    marginBottom: 'var(--space-6)',
  },
  link: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-accent)',
    fontWeight: 500,
  },
};

export default function GlobalNotFound() {
  return (
    <div style={nfStyles.container}>
      <div style={nfStyles.code}>404</div>
      <h1 style={nfStyles.title}>Page introuvable</h1>
      <p style={nfStyles.text}>
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link href="/" style={nfStyles.link}>
        Retour à l&apos;accueil&nbsp;&rarr;
      </Link>
    </div>
  );
}
