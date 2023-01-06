import { unstable_getServerSession } from 'next-auth/next';

import { authOptions } from '@web/lib/auth';

export async function getSession() {
  return unstable_getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();

  return session?.user;
}
