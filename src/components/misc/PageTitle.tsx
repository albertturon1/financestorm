import { twMerge } from 'tailwind-merge';

const PageTitle = ({
  title,
  subtitle,
  className = '',
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) => (
  <div className={twMerge('flex flex-col gap-y-1', className)}>
    <h1 className="text-lg font-bold sm:text-xl">{title}</h1>
    {subtitle && <p className="text-sm">{subtitle}</p>}
  </div>
);

export default PageTitle;
