import '@styles/global.css';
import { ReactNode } from 'react';

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
          <Navbar />
          <main className={'flex h-screen w-full flex-col pb-2 pt-24'}>
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
