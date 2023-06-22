import FlagCountryCode from '@components/misc/FlagCountryCode';
import { WalletCurrency } from '@src/zustand/walletStore';

const HomepageWalletCurrencies = ({
  walletCurrencies,
}: {
  walletCurrencies: WalletCurrency[];
}) => (
  <div className="flex flex-wrap justify-center gap-1 xs:gap-2">
    {walletCurrencies.map((walletCurrency) => (
      <div
        key={walletCurrency.name}
        className="flex w-max items-center justify-center gap-x-1 rounded-xl border-[1.5px] p-2 text-sm font-medium"
      >
        <p>{walletCurrency.amount}</p>
        <FlagCountryCode code={walletCurrency.name} reverse />
      </div>
    ))}
  </div>
);

export default HomepageWalletCurrencies;
