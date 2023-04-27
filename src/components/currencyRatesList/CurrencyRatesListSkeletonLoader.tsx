import PagePadding from '@components/misc/PagePadding';
import SkeletonLoader from '@components/ui/SkeletonLoader';

const CurrencyRatesListSkeletonLoader = () => (
  <PagePadding>
    <div className="flex flex-col">
      <SkeletonLoader className="mb-2 h-4 w-[200px] xs:h-7" />
      <div className="flex flex-col gap-y-2">
        <SkeletonLoader className="h-12 w-full xs:h-14" />
        <SkeletonLoader className="h-12 w-full rounded-lg py-1 xs:h-14" />
        <SkeletonLoader className="h-12 w-full xs:h-14" />
        <SkeletonLoader className="h-12 w-full xs:h-14" />
        <SkeletonLoader className="h-12 w-full xs:h-14" />
        <SkeletonLoader className="h-12 w-full xs:h-14" />
      </div>
    </div>
  </PagePadding>
);

export default CurrencyRatesListSkeletonLoader;
