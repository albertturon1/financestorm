import '@styles/global.css';
import { ReactNode } from 'react';

import GlobalNav from './GlobalNav';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <title>{'Projekt inżynierski'}</title>
      </head>
      <body className="h-screen w-full bg-primaryBlack">
        <div>
          {/* @ts-expect-error Server Component */}
          <GlobalNav />
          {children}
        </div>
      </body>
    </html>
  );
}
