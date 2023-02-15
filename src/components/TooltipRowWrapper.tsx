import { CSSProperties, ReactElement } from 'react';

import { twMerge } from 'tailwind-merge';

const TooltipRowWrapper = ({
  children,
  style,
  className = '',
}: {
  children: ReactElement | ReactElement[];
  style?: CSSProperties;
  className?: string;
}) => (
  <div
    className={twMerge('flex items-center gap-x-2', className)}
    style={style}
  >
    {children}
  </div>
);

export default TooltipRowWrapper;
