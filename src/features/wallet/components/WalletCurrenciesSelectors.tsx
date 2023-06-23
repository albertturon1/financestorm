'use client';

import { TransitionStartFunction } from 'react';

import { WalletCurrency } from '@src/zustand/walletStore';

import { WalletAddCurrency } from './WalletAddCurrency';
import { WalletBaseCurrenciesList } from './WalletBaseCurrenciesList';
import { WalletQuoteCurrencySelector } from './WalletQuoteCurrencySelector';

export const WALLET_SELECTORS_INPUT_MAX_WIDTH = 230;

const WalletCurrenciesSelectors = ({
  ...props
}: {
  walletBaseCurrencies: WalletCurrency[];
  walletQuoteCurrency: WalletCurrency;
  startCurrenciesTransition: TransitionStartFunction;
}) => (
  <div className="flex flex-col justify-center gap-y-2 self-center rounded-xl border-b border-border py-1.5 pl-3 lg:text-lg tall:py-3">
    <h1 className="max-w-full text-center text-sm">
      {'Currencies included in the wallet'}
    </h1>
    <WalletQuoteCurrencySelector {...props} />
    <WalletAddCurrency {...props} />
    <WalletBaseCurrenciesList {...props} />
  </div>
);

export default WalletCurrenciesSelectors;
