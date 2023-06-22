import { ReactNode } from 'react';

const PageMaxWidth = ({
  flex = false,
  children,
}: {
  flex?: boolean;
  children: ReactNode;
}) => (
  <div
    className={`3xl:max-w-screen-2xl mx-auto flex w-full max-w-screen-xl flex-col ${
      flex ? 'flex-1' : ''
    }`}
  >
    {children}
  </div>
);

export default PageMaxWidth;
