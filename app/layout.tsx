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
      <body className="flex h-screen w-screen flex-col">
        <ReactQueryWrapper>
          {/* @ts-expect-error Server Component */}
          <GlobalNav />
          <main className={'flex h-full w-full flex-col bg-primaryBlack pt-6'}>
            {children}
          </main>
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
