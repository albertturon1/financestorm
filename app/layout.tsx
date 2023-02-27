import '@styles/global.css';
import { ReactNode } from 'react';

import Navbar from './Navbar';
import ReactQueryWrapper from './ReactQueryWrapper';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <title>{'Projekt inżynierski'}</title>
      </head>
      <body>
        <ReactQueryWrapper>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          <main className={'flex h-screen w-full flex-col pt-24 lg:pt-28 pb-2'}>
            {children}
          </main>
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
