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
      'flex max-w-full flex-col rounded border-2 border-slate-500 bg-secondaryBlack px-5 py-3 text-lg',
      className,
    )}
  >
    {children}
  </div>
);

export default TooltipWrapper;
