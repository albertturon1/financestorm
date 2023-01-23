import '@styles/global.css';
import { ReactNode } from 'react';

import GlobalNav from './GlobalNav';
import ReactQueryWrapper from './ReactQueryWrapper';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <title>{'Projekt inżynierski'}</title>
      </head>
      <body className="h-full w-full bg-primaryBlack">
        <ReactQueryWrapper>
          {/* @ts-expect-error Server Component */}
          <GlobalNav />
          <main className={'flex h-full w-full flex-col pt-28 pb-2'}>
            {children}
          </main>
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
