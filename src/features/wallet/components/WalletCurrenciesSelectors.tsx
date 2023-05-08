'use client';

import { TransitionStartFunction } from 'react';

import { WalletCurrency } from '@src/zustand/walletStore';

import WalletCurrenciesSelectorsBaseCurrencies from './WalletCurrenciesSelectorsBaseCurrencies';
import WalletCurrenciesSelectorsQuote from './WalletCurrenciesSelectorsQuoteCurrency';

const WalletCurrenciesSelectors = ({
  ...props
}: {
  walletBaseCurrencies: WalletCurrency[];
  walletQuoteCurrency: WalletCurrency;
  startCurrenciesTransition: TransitionStartFunction;
}) => (
  <div className="flex h-max w-full max-w-[315px] flex-col justify-center gap-y-2 self-center pl-[15px] lg:text-lg">
    <h1 className="max-w-full text-center text-sm font-medium">
      {'Currencies included in the wallet'}
    </h1>
    <WalletCurrenciesSelectorsQuote {...props} />
    <WalletCurrenciesSelectorsBaseCurrencies {...props} />
  </div>
);

export default WalletCurrenciesSelectors;
