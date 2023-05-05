import { WalletCurrency } from '@src/zustand/walletStore';
import WalletCurrenciesSelectorsItems from './WalletCurrenciesSelectorsItems';

const WalletCurrenciesSelectors = ({
  baseWalletCurrencies,
  quoteWalletCurrency,
}: {
  baseWalletCurrencies: WalletCurrency[];
  quoteWalletCurrency: WalletCurrency;
}) => {
  return (
    <div className="flex flex-col">
      {[quoteWalletCurrency, ...baseWalletCurrencies].map((walletCurrency) => (
        <WalletCurrenciesSelectorsItems
          key={walletCurrency.name}
          walletCurrency={walletCurrency}
        />
      ))}
    </div>
  );
};

export default WalletCurrenciesSelectors;
