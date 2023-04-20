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
      'flex max-w-xs flex-col flex-wrap rounded border-2 border-slate-500 bg-secondaryBlack px-4 py-2 text-lg sm:max-w-lg md:px-5 md:py-3',
      className,
    )}
  >
    {children}
  </div>
);

export default TooltipWrapper;
