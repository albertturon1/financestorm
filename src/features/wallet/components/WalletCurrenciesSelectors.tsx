'use client';

import FlagInput from '@components/misc/FlagInput';
import {
  WalletCurrency,
  useWalletActions,
} from '@src/zustand/walletStore';

const WalletCurrenciesSelectors = ({
  walletBaseCurrencies,
  walletQuoteCurrency,
}: {
  walletBaseCurrencies: WalletCurrency[];
  walletQuoteCurrency: WalletCurrency;
}) => {
  const { patchWalletQuoteCurrency, patchWalletBaseCurrency } =
    useWalletActions();

  return (
    <div className="flex w-full max-w-[300px] flex-col gap-y-2 self-center lg:text-lg">
      <FlagInput
        amount={walletQuoteCurrency.amount}
        currency={walletQuoteCurrency.name}
        onChange={({ target }) => {
          if (isNaN(target.valueAsNumber)) return;
          patchWalletQuoteCurrency({
            ...walletQuoteCurrency,
            amount: target.valueAsNumber,
          });
        }}
      />
      {walletBaseCurrencies.map((walletCurrency) => (
        <FlagInput
          key={walletCurrency.name}
          amount={walletCurrency.amount}
          currency={walletCurrency.name}
          onChange={({ target }) => {
            if (isNaN(target.valueAsNumber)) return;
            patchWalletBaseCurrency({
              ...walletCurrency,
              amount: target.valueAsNumber,
            });
          }}
        />
      ))}
    </div>
  );
};

export default WalletCurrenciesSelectors;
