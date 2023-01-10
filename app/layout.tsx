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
      <body className="flex flex-1 bg-primaryBlack">
        <ReactQueryWrapper>
          <div className="h-full w-full">
            <GlobalNav />
            <div className="pt-5">{children}</div>
          </div>
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
