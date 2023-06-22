import SkeletonLoader from '@components/ui/SkeletonLoader';

const MultiCurrenciesPairSelectorsLoader = () => (
  <div className="flex h-10 w-full items-end gap-x-1 xs:gap-x-3 sm:gap-x-5 lg:gap-x-10">
    <SkeletonLoader className="flex h-full w-full flex-1" />
    <SkeletonLoader className="flex h-full w-full flex-1" />
  </div>
);

export default MultiCurrenciesPairSelectorsLoader;
