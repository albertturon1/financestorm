import { twMerge } from 'tailwind-merge';

const SkeletonLoader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={twMerge('bg-muted animate-pulse rounded-md', className)}
      {...props}
    />
  );

export default SkeletonLoader;
