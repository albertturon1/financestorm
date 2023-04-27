'use client';

import { ReactNode } from 'react';

import Scrollbars from 'react-custom-scrollbars-2';

const ClientScrollbars = ({
  children,
  className = '',
  ...props
}: {
  children: ReactNode;
  className?: string;
} & Partial<Scrollbars>) => (
  <div className={className}>
    <Scrollbars universal {...props}>
      {/*wrapper div to prevent SSR children render errors*/}
      <div>{children}</div>
    </Scrollbars>
  </div>
);

export default ClientScrollbars;
