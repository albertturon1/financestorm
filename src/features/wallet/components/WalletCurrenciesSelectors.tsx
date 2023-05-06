'use client';

import { TransitionStartFunction } from 'react';

import FlagInput from '@components/misc/FlagInput';
import { WalletCurrency, useWalletActions } from '@src/zustand/walletStore';

const WalletCurrenciesSelectors = ({
  walletBaseCurrencies,
  walletQuoteCurrency,
  startCurrenciesTransition,
}: {
  walletBaseCurrencies: WalletCurrency[];
  walletQuoteCurrency: WalletCurrency;
  startCurrenciesTransition: TransitionStartFunction;
}) => {
  const { patchWalletQuoteCurrency, patchWalletBaseCurrency } =
    useWalletActions();

  return (
    <div className="flex w-full max-w-[300px] flex-col gap-y-2 self-center lg:text-lg">
      <FlagInput
        amount={walletQuoteCurrency.amount}
        currency={walletQuoteCurrency.name}
        onChange={({ target }) => {
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
