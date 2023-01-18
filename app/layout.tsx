import '@styles/global.css';
import { ReactNode } from 'react';

import GlobalNav from './GlobalNav';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <title>{'Projekt inżynierski'}</title>
      </head>
      <body className="flex h-screen w-screen flex-col">
        {/* @ts-expect-error Server Component */}
        <GlobalNav />
        <div className="flex h-full w-full flex-col bg-primaryBlack pt-5">
          {children}
        </div>
      </body>
    </html>
  );
}
