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
      <body className="w-full h-screen bg-primaryBlack">
        <ReactQueryWrapper>
          <div>
            <GlobalNav />
            {children}
          </div>
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
