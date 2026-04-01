import type { Metadata } from 'next';
import { manrope } from '@/lib/fonts';
import '@/styles/globals.css';
import '@/styles/typography.css';

export const metadata: Metadata = {
  title: {
    template: '%s | JURISSO',
    default: 'JURISSO — Recherche juridique intelligente',
  },
  description:
    'Accédez à 3,2 millions de décisions de justice et 450 000 textes législatifs. Recherche instantanée, alertes intelligentes, annotations collaboratives.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://jurisso.fr',
    siteName: 'JURISSO',
    title: 'JURISSO — Recherche juridique intelligente',
    description:
      'Accédez à 3,2 millions de décisions de justice et 450 000 textes législatifs.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JURISSO — Recherche juridique intelligente',
    description:
      'Accédez à 3,2 millions de décisions de justice et 450 000 textes législatifs.',
  },
  metadataBase: new URL('https://jurisso.fr'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={manrope.variable}>
        {children}
      </body>
    </html>
  );
}
