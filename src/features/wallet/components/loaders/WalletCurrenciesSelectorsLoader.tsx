import SkeletonLoader from '@components/ui/SkeletonLoader';

const WalletCurrenciesSelectorsLoader = () => (
  <div className="mt-4 flex w-full max-w-[300px] flex-col gap-y-2 self-center pb-2 lg:text-lg">
    <SkeletonLoader
      className="mx-auto h-5 w-[210px]"
      style={{
        animationDelay: `${0.05}s`,
        animationDuration: '1s',
      }}
    />
    {Array.from({ length: 5 }, (_, i) => (
      <SkeletonLoader
        key={i}
        className="h-10 w-full rounded-xl"
        style={{
          animationDelay: `${(i + 1) * 0.05}s`,
          animationDuration: '1s',
        }}
      />
    ))}
  </div>
);

export default WalletCurrenciesSelectorsLoader;
