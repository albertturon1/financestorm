import '@styles/global.css';

import { ReactNode } from 'react';

import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';

import Navbar from '@components/navbar';

import ReactQueryProvider from '../src/components/providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: 'FinanceStorm',
  description: `Harness the potential of numerous currencies, historical data, and a sleek UI/UX to make informed financial decisions and perform various currency-related operations and provides valuable insights. Get access to multicurrencies comparisons and inflation statistics.`,
  
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{'FinanceStorm'}</title>
      </head>
      <body>
        <ReactQueryProvider>
          <main
            className=
              'min-w-screen relative flex min-h-screen flex-col bg-background'
          >
            <Navbar />
            <div className="flex flex-1 flex-col">{children}</div>
          </main>
          <Analytics />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
