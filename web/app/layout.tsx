import React from 'react';

import '@web/app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Got Balls</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
