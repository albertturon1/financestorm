import { ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

const TooltipWrapper = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={twMerge(
      'flex flex-col rounded border-2 border-slate-500 bg-secondaryBlack p-5 text-lg',
      className,
    )}
  >
    {children}
  </div>
);

export default TooltipWrapper;
