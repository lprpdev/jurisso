import { NextRequest, NextResponse } from 'next/server';

const protectedPaths = [
  '/dashboard',
  '/recherche',
  '/favoris',
  '/collections',
  '/alertes',
  '/annotations',
  '/historique',
  '/profil',
  '/parametres',
  '/admin',
  '/mon-compte',
];

const authPaths = ['/auth/connexion', '/auth/inscription', '/auth/mot-de-passe-oublie'];
const authExcludedPaths = ['/auth/email-verifie', '/auth/verification-email'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('access_token')?.value;
  const isAuthenticated = !!token;

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isAuthPage =
    authPaths.some((p) => pathname.startsWith(p)) &&
    !authExcludedPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !isAuthenticated) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/connexion';
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPage && isAuthenticated) {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
