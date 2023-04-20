import { ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

const PagePadding = ({
  flex = false,
  children,
  className,
  horizontal = true,
  vertical = false,
}: {
  flex?: boolean;
  horizontal?: boolean;
  vertical?: boolean;
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={twMerge(
      `flex flex-col ${horizontal ? 'px-2 xs:px-3 sm:px-8 lg:px-12' : ''} ${
        vertical ? 'py-2 xs:py-3 sm:py-8 lg:py-12' : ''
      } ${flex ? 'flex-1' : ''}`,
      className,
    )}
  >
    {children}
  </div>
);

export default PagePadding;
