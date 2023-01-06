import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import { CallbacksOptions, NextAuthOptions } from 'next-auth';
import { Provider } from 'next-auth/providers';
import { apiFetch } from '@web/lib/typedFetch';

const providers = (() => {
  const px: Provider[] = [];

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    px.push(
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            scope: [
              'openid',
              'https://www.googleapis.com/auth/calendar',
              'https://www.googleapis.com/auth/userinfo.email',
              'https://www.googleapis.com/auth/userinfo.profile',
            ].join(' '),
          },
        },
      }),
    );
  }

  return px;
})();

export const authOptions: NextAuthOptions & {
  callbacks: Partial<CallbacksOptions<GoogleProfile>>;
} = {
  providers,
  session: { strategy: 'jwt' },
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        apiToken: token.apiToken as string,
      };
    },
    jwt: async ({ account, profile, token, user }) => {
      // Initial sign in
      if (account && user && profile && 'given_name' in profile) {
        const { data } = await apiFetch<API.AuthSignInResponse>(
          `/auth/sign-in`,
          {
            method: 'POST',
            body: {
              provider: 'google',
              locale: profile.locale,
              email: profile.email,
              firstName: profile.given_name,
              lastName: profile.family_name,
              fullName: profile.name,
              image: profile.picture,
              accessToken: account.access_token,
              idToken: account.id_token,
            },
          },
        );

        return { ...token, apiToken: data.jwt };
      }

      return token;
    },
  },
};
