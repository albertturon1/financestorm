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
      'flex max-w-xs sm:max-w-lg flex-col flex-wrap rounded border-2 border-slate-500 bg-secondaryBlack px-5 py-3 text-lg mt-20',
      className,
    )}
  >
    {children}
  </div>
);

export default TooltipWrapper;
