import { ReactNode } from 'react';

const TooltipWrapper = ({ children }: { children: ReactNode }) => (
  <div className=" flex flex-col rounded border border-slate-50  bg-secondaryBlack p-4 text-lg">
    {children}
  </div>
);

export default TooltipWrapper;
