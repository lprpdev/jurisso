'use client';

import { useEffect } from 'react';

const errorStyles: Record<string, React.CSSProperties> = {
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
  title: {
    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
    fontSize: 'var(--text-3xl)',
    fontWeight: 700,
    color: 'var(--color-error)',
    marginBottom: 'var(--space-3)',
  },
  text: {
    fontSize: 'var(--text-base)',
    color: 'var(--color-muted)',
    lineHeight: 'var(--leading-relaxed)',
    maxWidth: 480,
    marginBottom: 'var(--space-6)',
  },
  button: {
    padding: 'var(--space-2) var(--space-6)',
    fontSize: 'var(--text-sm)',
    fontWeight: 500,
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-white)',
    cursor: 'pointer',
    border: 'none',
  },
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div style={errorStyles.container}>
      <h1 style={errorStyles.title}>Une erreur est survenue</h1>
      <p style={errorStyles.text}>
        Nous sommes désolés, une erreur inattendue s&apos;est produite. Si le
        problème persiste, contactez notre support.
      </p>
      <button type="button" style={errorStyles.button} onClick={reset}>
        Réessayer
      </button>
    </div>
  );
}
