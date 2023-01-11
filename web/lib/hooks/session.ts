'use client';

import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Session } from 'next-auth';

/**
 * Alternative to NextAuth useSession hook. NextAuth requires SessionProvider
 * to be used, however, due NextJS 13, it's a bit more complex tu use it.
 * @returns session or null.
 */
export function useSession() {
  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    getSession().then((res) => setSession(res));
  }, []);

  return session;
}
