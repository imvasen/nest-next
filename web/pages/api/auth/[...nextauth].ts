import NextAuth from 'next-auth';

import { authOptions } from '@web/lib/auth';

export default NextAuth(authOptions);
