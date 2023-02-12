import { CSSProperties, ReactElement } from 'react';

const TooltipRowWrapper = ({
  children,
  style,
  className = '',
}: {
  children: ReactElement | ReactElement[];
  style?: CSSProperties;
  className?: string;
}) => (
  <div className={`mb-1 flex items-center gap-x-2 ${className}`} style={style}>
    {children}
  </div>
);

export default TooltipRowWrapper;
