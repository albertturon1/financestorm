import SkeletonLoader from '@components/ui/SkeletonLoader';

const WalletCurrenciesSelectorsLoader = () => (
  <div className="mt-5 flex h-[205px] w-full max-w-[300px] flex-col gap-y-2 self-center sm:h-[245px] lg:h-[282px] lg:text-lg ">
    <SkeletonLoader
      className="mx-auto h-5 w-[220px] rounded-xl"
      style={{
        animationDelay: `${0.05}s`,
        animationDuration: '1s',
      }}
    />
    <SkeletonLoader
      className="h-full w-full rounded-xl"
      style={{
        animationDelay: `${0.1}s`,
        animationDuration: '1s',
      }}
    />
  </div>
);

export default WalletCurrenciesSelectorsLoader;
