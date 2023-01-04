import { getSession as clientGetSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';

import { authOptions } from '@web/lib/auth';

export async function getSession() {
  // console.log({ window });

  // if (typeof window === 'undefined') {
  //   return await unstable_getServerSession(authOptions);
  // }

  return clientGetSession();
}

export async function getCurrentUser() {
  const session = await getSession();

  return session?.user;
}
