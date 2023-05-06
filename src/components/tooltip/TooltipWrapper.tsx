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
      'flex max-w-xs flex-col flex-wrap rounded border-[1.5px] border-slate-500 bg-muted px-4 py-2 text-sm font-medium sm:max-w-lg md:px-5 md:py-3',
      className,
    )}
  >
    {children}
  </div>
);

export default TooltipWrapper;
