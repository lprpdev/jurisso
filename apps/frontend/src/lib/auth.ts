import { cookies } from 'next/headers';

interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  plan: 'free' | 'pro' | 'enterprise';
  profession: string;
  avatarUrl: string | null;
}

interface Session {
  user: SessionUser;
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = Buffer.from(parts[1]!, 'base64url').toString('utf-8');
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export async function auth(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  if (!token) return null;

  const payload = decodeJwtPayload(token);
  if (!payload || !payload.sub) return null;

  // Check expiry
  if (typeof payload.exp === 'number' && payload.exp * 1000 < Date.now()) return null;

  return {
    user: {
      id: payload.sub as string,
      email: payload.email as string,
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
      role: payload.role as 'user' | 'admin',
      plan: payload.plan as 'free' | 'pro' | 'enterprise',
      profession: (payload.profession as string) ?? '',
      avatarUrl: (payload.avatarUrl as string | null) ?? null,
    },
  };
}

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('access_token')?.value ?? null;
}
