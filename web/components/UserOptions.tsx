'use client';

import { getSession, signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import React from 'react';

export default function UserOptions() {
  const [session, setSession] = React.useState<Session | null>();

  React.useEffect(() => {
    getSession().then(setSession);
  }, []);

  return (
    <div>
      {session ? (
        <div>
          <div>Hey, {session.user.name || session.user.email}</div>
          <button className="border border-black" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  );
}
