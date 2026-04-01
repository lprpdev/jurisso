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

function isTokenValid(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const payload = JSON.parse(
      Buffer.from(parts[1]!, 'base64url').toString('utf-8'),
    );
    if (typeof payload.exp === 'number' && payload.exp * 1000 < Date.now()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('access_token')?.value;
  const isAuthenticated = !!token && isTokenValid(token);

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isAuthPage =
    authPaths.some((p) => pathname.startsWith(p)) &&
    !authExcludedPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !isAuthenticated) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/connexion';
    url.searchParams.set('callbackUrl', pathname);
    // Clear expired cookie
    const response = NextResponse.redirect(url);
    if (token && !isTokenValid(token)) {
      response.cookies.delete('access_token');
    }
    return response;
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
