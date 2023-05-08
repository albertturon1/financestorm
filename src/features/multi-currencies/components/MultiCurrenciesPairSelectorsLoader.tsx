import SkeletonLoader from '@components/ui/SkeletonLoader';

const MultiCurrenciesPairSelectorsLoader = () => (
    <div className="flex w-full items-end gap-x-1 xs:gap-x-3 sm:gap-x-5 lg:gap-x-10 h-10">
        <SkeletonLoader className="flex flex-1 h-full w-full" />
        <SkeletonLoader className="flex flex-1 h-full w-full" />
    </div>
  );

export default MultiCurrenciesPairSelectorsLoader;
