import { ChangeEvent, TransitionStartFunction, useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useModifySearchParams } from '@hooks/useModifySearchParams';
import { Currency } from '@interfaces/ICurrency';
import { WalletCurrency } from '@src/zustand/walletStore';
import { substituePotentialNaNToZero } from '@utils/misc';

export const useWalletQuoteCurrencySelectorMethods = ({
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
  const toQueryString = useModifySearchParams();

  const onCurrencyChange = useCallback(
    (newQuoteCurrency: Currency) => {
      //searching if newQuoteCurrency is on the list of base currencies
      const possibleBaseCurrencyFutureQuote = walletBaseCurrencies.find(
        (c) => c.name === newQuoteCurrency,
      );
      //TODO: remove redundancy
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
      } else {
        const trimParams = params.toString().replace(/%2C/g, ',');
        void router.replace(`/wallet?${trimParams}`, {
          forceOptimisticNavigation: true,
        });
      }
    },
    [router, searchParams, walletBaseCurrencies, walletQuoteCurrency.amount],
  );

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const newQuoteCurrencyParam = toQueryString(
        'quote',
        `${substituePotentialNaNToZero(target.valueAsNumber)}${
          walletQuoteCurrency.name
        }`,
      );

      startCurrenciesTransition(() => {
        void router.replace(`/wallet?${newQuoteCurrencyParam}`, {
          forceOptimisticNavigation: true,
        });
      });
    },
    [
      router,
      startCurrenciesTransition,
      toQueryString,
      walletQuoteCurrency.name,
    ],
  );

  return { onCurrencyChange, onInputChange };
};
