'use client';

import { TransitionStartFunction, useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { WalletCurrency, useWalletActions } from '@src/zustand/walletStore';
import { createQueryString, substituePotentialNaNToZero } from '@utils/misc';

import WalletQuoteCurrencyInputSelect from './WalletQuoteCurrencyInputSelect';

const WalletCurrenciesSelectorsQuoteCurrency = ({
  walletBaseCurrencies,
  walletQuoteCurrency,
  startCurrenciesTransition,
}: {
  walletBaseCurrencies: WalletCurrency[];
  walletQuoteCurrency: WalletCurrency;
  startCurrenciesTransition: TransitionStartFunction;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { patchWalletQuoteCurrency, deleteWalletBaseCurrency } =
    useWalletActions();

  const toQueryString = useCallback(
    (param: string, value: string) =>
      createQueryString({ param, value, searchParams }),
    [searchParams],
  );

  return (
    <div className="w-full pr-[59px]">
      <WalletQuoteCurrencyInputSelect
        defaultValue={walletQuoteCurrency.amount}
        currency={walletQuoteCurrency.name}
        onInputChange={({ target }) => {
          const newQuoteCurrencyParam = `${toQueryString(
            'quote',
            `${substituePotentialNaNToZero(target.valueAsNumber)}${
              walletQuoteCurrency.name
            }`,
          )}`;

          //change url and state after UI change
          startCurrenciesTransition(() => {
            patchWalletQuoteCurrency({
              ...walletQuoteCurrency,
              amount: substituePotentialNaNToZero(target.valueAsNumber),
            });
            void router.replace(`/wallet?${newQuoteCurrencyParam}`, {
              forceOptimisticNavigation: true,
            });
          });
        }}
        onCurrencyChange={(newQuoteCurrency) => {
          //searching if newQuoteCurrency is on the list of base currencies
          const baseCurrencyFutureQuote = walletBaseCurrencies.find(
            (c) => c.name === newQuoteCurrency,
          );

          const newQuoteCurrencyParam = `${toQueryString(
            'quote',
            `${substituePotentialNaNToZero(
              walletQuoteCurrency.amount,
            )}${newQuoteCurrency}`,
          )}`;

          if (baseCurrencyFutureQuote) {
            patchWalletQuoteCurrency(baseCurrencyFutureQuote);
            deleteWalletBaseCurrency(baseCurrencyFutureQuote.name); //delete currency from baseCurrencies
          } else
            patchWalletQuoteCurrency({
              name: newQuoteCurrency,
              amount: 1,
            });

          void router.replace(`/wallet?${newQuoteCurrencyParam}`, {
            forceOptimisticNavigation: true,
          });
        }}
      />
    </div>
  );
};

export default WalletCurrenciesSelectorsQuoteCurrency;
