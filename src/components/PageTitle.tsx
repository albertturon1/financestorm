import { twMerge } from 'tailwind-merge';

const PageTitle = ({
  children,
  className = '',
}: {
  children: string;
  className?: string;
}) => (
  <h1 className={twMerge('text-lg lg:text-xl font-semibold tracking-wide', className)}>
    {children}
  </h1>
);

export default PageTitle;
