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
        vertical ? 'pb-5 pt-3 sm:pb-10 sm:pt-8 lg:pb-12 lg:pt-10' : ''
      } ${flex ? 'flex-1' : ''}`,
      className,
    )}
  >
    {children}
  </div>
);

export default PagePadding;
