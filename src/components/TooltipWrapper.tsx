import { ReactNode } from 'react';

const TooltipWrapper = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`flex flex-col rounded border border-slate-50  bg-secondaryBlack p-4 text-lg ${className}`}
  >
    {children}
  </div>
);

export default TooltipWrapper;
