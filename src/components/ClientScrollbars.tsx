'use client';

import { ReactNode } from 'react';

import Scrollbars from 'react-custom-scrollbars-2';
import { twMerge } from 'tailwind-merge';

const ClientScrollbars = ({
  children,
  className = '',
  ...props
}: {
  children: ReactNode;
  className?: string;
} & Partial<Scrollbars>) => (
  <Scrollbars universal {...props} autoHeight>
    <div className={twMerge('flex w-max', className)}>{children}</div>
  </Scrollbars>
);

export default ClientScrollbars;
