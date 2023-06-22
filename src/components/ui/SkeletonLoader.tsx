import { twMerge } from 'tailwind-merge';

const SkeletonLoader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={twMerge('animate-pulse rounded-md bg-muted', className)}
    {...props}
  />
);

export default SkeletonLoader;
