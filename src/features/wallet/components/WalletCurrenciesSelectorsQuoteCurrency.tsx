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
          const possibleBaseCurrencyFutureQuote = walletBaseCurrencies.find(
            (c) => c.name === newQuoteCurrency,
          );

          const params = new URLSearchParams(
            searchParams as unknown as URLSearchParams,
          );
          //setting new quote
          params.set(
            'quote',
            `${substituePotentialNaNToZero(
              walletQuoteCurrency.amount,
            )}${newQuoteCurrency}`,
          );

          if (possibleBaseCurrencyFutureQuote) {
            const newBaseCurrencies = walletBaseCurrencies
              .filter((c) => c.name !== newQuoteCurrency) //removal of newQuoteCurrency from baseCurrencies
              .map((c) => `${walletQuoteCurrency.amount}${c.name}`)
              .join(',');

            params.set('base', newBaseCurrencies);
            const trimParams = params.toString().replace(/%2C/g, ',');

            void router.replace(`/wallet?${trimParams}`, {
              forceOptimisticNavigation: true,
            });

            patchWalletQuoteCurrency(possibleBaseCurrencyFutureQuote);
            deleteWalletBaseCurrency(possibleBaseCurrencyFutureQuote.name); //delete currency from baseCurrencies
          } else {
            const trimParams = params.toString().replace(/%2C/g, ',');
            void router.replace(`/wallet?${trimParams}`, {
              forceOptimisticNavigation: true,
            });

            patchWalletQuoteCurrency({
              name: newQuoteCurrency,
              amount: walletQuoteCurrency.amount,
            });
          }
        }}
      />
    </div>
  );
};

export default WalletCurrenciesSelectorsQuoteCurrency;
