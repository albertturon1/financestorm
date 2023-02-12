import { CSSProperties, ReactElement } from 'react';

const TooltipRowWrapper = ({
  children,
  style,
}: {
  children: ReactElement | ReactElement[];
  style?: CSSProperties;
}) => (
  <div className="flex items-center mb-1 gap-x-2" style={style}>
    {children}
  </div>
);

export default TooltipRowWrapper;
