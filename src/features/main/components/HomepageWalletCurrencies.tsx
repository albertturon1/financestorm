import FlagCountryCode from '@components/misc/FlagCountryCode';
import { WalletCurrency } from '@src/zustand/walletStore';

const HomepageWalletCurrencies = ({
  walletCurrencies,
}: {
  walletCurrencies: WalletCurrency[];
}) => (
  <div className="flex flex-wrap justify-center gap-1 xs:gap-2">
    {walletCurrencies.map((wc) => (
      <HomepageWalletCurrenciesItem key={wc.name} walletCurrency={wc} />
    ))}
  </div>
);

const HomepageWalletCurrenciesItem = ({
  walletCurrency,
}: {
  walletCurrency: WalletCurrency;
}) => (
  <div className="flex w-max items-center justify-center gap-x-1 rounded-xl border-[1.5px] p-2 text-sm font-medium">
    <p>{walletCurrency.amount}</p>
    <FlagCountryCode code={walletCurrency.name} reverse />
  </div>
);

export default HomepageWalletCurrencies;
