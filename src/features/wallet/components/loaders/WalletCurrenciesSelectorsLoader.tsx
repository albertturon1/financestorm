import SkeletonLoader from '@components/ui/SkeletonLoader';
import useWalletStore from '@src/zustand/walletStore';

const WalletCurrenciesSelectorsLoader = () => (
    <div className="flex w-full max-w-[300px] flex-col gap-y-2 self-center lg:text-lg">
      {Array.from(
        { length: useWalletStore.getState().baseCurrencies.length + 1 },
        (_, i) => (
          <SkeletonLoader
            key={i}
            className="h-10 w-full rounded-xl"
            style={{
              animationDelay: `${i * 0.05}s`,
              animationDuration: '1s',
            }}
          />
        ),
      )}
    </div>
  );

export default WalletCurrenciesSelectorsLoader;
