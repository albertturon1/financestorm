'use client';

import { TransitionStartFunction, useMemo } from 'react';

import { CURRENCIES } from '@constants/currencies';
import { WalletCurrency } from '@src/zustand/walletStore';

import { WALLET_SELECTORS_INPUT_MAX_WIDTH } from './WalletCurrenciesSelectors';
import WalletCurrencyInputSelect from './WalletCurrencyInputSelect';
import { useWalletQuoteCurrencySelectorInputMethods } from '../hooks/useWalletQuoteCurrencyOnChange';

export const WalletQuoteCurrencySelector = ({
  walletQuoteCurrency,
  ...props
}: {
  walletBaseCurrencies: WalletCurrency[];
  walletQuoteCurrency: WalletCurrency;
  startCurrenciesTransition: TransitionStartFunction;
}) => {
  const availableCurrencies = useMemo(
    () => CURRENCIES.filter((c) => c !== walletQuoteCurrency.name),
    [walletQuoteCurrency.name],
  );

  const methods = useWalletQuoteCurrencySelectorInputMethods({
    ...props,
    walletQuoteCurrency,
  });

  return (
    <div style={{ width: WALLET_SELECTORS_INPUT_MAX_WIDTH }}>
      <WalletCurrencyInputSelect
        defaultValue={walletQuoteCurrency.amount}
        currentCurrency={walletQuoteCurrency.name}
        currencies={availableCurrencies}
        {...methods}
      />
    </div>
  );
};
