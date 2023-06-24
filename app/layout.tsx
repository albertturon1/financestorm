import '@styles/global.css';

import { ReactNode } from 'react';

import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { Bebas_Neue } from 'next/font/google';

import Navbar from '@components/navbar';
import { APP_TITLE } from '@constants/global';

import ReactQueryProvider from '../src/components/providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: APP_TITLE,
  description: `Harness the potential of numerous currencies, historical data, and a sleek UI/UX to make informed financial decisions and perform various currency-related operations and provides valuable insights. Get access to multicurrencies comparisons and inflation statistics.`,
};

const bebas_neue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin-ext'],
  preload: true,
  variable: '--font-bebas-neue',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${bebas_neue.variable}`}>
      <head>
        <title>{APP_TITLE}</title>
      </head>
      <body>
        <ReactQueryProvider>
          <main className="min-w-screen relative flex min-h-screen flex-col bg-background">
            <Navbar />
            <div className="flex flex-1 flex-col">{children}</div>
          </main>
          <Analytics />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
