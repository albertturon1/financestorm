import { CSSProperties, ReactElement } from 'react';

import { twMerge } from 'tailwind-merge';

const TooltipRowWrapper = ({
  children,
  style,
  className,
  justifyBetween = true,
}: {
  children: ReactElement | ReactElement[];
  style?: CSSProperties;
  className?: string;
  justifyBetween?: boolean;
}) => (
  <div
    className={twMerge(
      'flex items-center gap-x-2',
      justifyBetween && 'justify-between gap-x-4',
      className,
    )}
    style={style}
  >
    {children}
  </div>
);

export default TooltipRowWrapper;
