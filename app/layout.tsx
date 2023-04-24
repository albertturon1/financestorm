import '@styles/global.css';
import { ReactNode } from 'react';

import { Analytics } from '@vercel/analytics/react';

import Navbar from './Navbar';
import ReactQueryProvider from '../src/utils/providers/ReactQueryProvider';

export const metadata = {
  title: 'FinanceStorm',
  description: `Albert Turoń's engineers thesis refactored`,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <title>{'FinanceStorm'}</title>
      </head>
      <body>
        <ReactQueryProvider>
          <main
            className={
              'min-w-screen relative flex min-h-screen flex-col bg-background'
            }
          >
            <Navbar />
            <div className="flex flex-1 flex-col">{children}</div>
          </main>
        </ReactQueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
