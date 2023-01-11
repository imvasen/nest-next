'use client';

import { useSession } from '@web/lib/hooks/session';
import { signIn, signOut } from 'next-auth/react';
import React from 'react';

export default function UserOptions() {
  const session = useSession();

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
