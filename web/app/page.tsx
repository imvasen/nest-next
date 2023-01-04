import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

import StatusChecker from '@web/components/StatusChecker';
import styles from '@web/styles/Home.module.css';
import { getSession } from '@web/lib/session';

export default async function Home() {
  const session = await getSession();

  console.log({ session });
  fetch('/api/v1/status/test').then(console.log);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <StatusChecker />

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        {/* {session.status === 'unauthenticated' && (
          <div className={styles.auth}>
            <a href="/api/auth/signin" onClick={() => signIn()}>
              Sign In
            </a>
          </div>
        )}
        {session.status === 'authenticated' && (
          <div className={styles.auth}>
            <div>Hey, {session.data.user.name || session.data.user.email}</div>
            <div>
              <a href="/api/auth/signout" onClick={() => signOut()}>
                Sign out
              </a>
            </div>
          </div>
        )} */}

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}