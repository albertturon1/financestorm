import { ChangeEvent, TransitionStartFunction, useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { useModifySearchParams } from '@hooks/useModifySearchParams';
import { Currency } from '@interfaces/ICurrency';
import { WalletCurrency } from '@src/zustand/walletStore';
import { substituePotentialNaNToZero } from '@utils/misc';

export const useWalletBaseCurrenciesListMethods = ({
  walletBaseCurrencies,
  startCurrenciesTransition,
}: {
  walletBaseCurrencies: WalletCurrency[];
  startCurrenciesTransition: TransitionStartFunction;
}) => {
  const router = useRouter();
  const toQueryString = useModifySearchParams();

  const onInputChange = useCallback(
    (
      event: ChangeEvent<HTMLInputElement>,
      walletBaseCurrencyName: Currency,
    ) => {
      const newBaseCurrencyParam = walletBaseCurrencies
        .map((c) => {
          if (c.name !== walletBaseCurrencyName)
            return `${substituePotentialNaNToZero(c.amount)}${c.name}`;
          return `${substituePotentialNaNToZero(event.target.valueAsNumber)}${
            c.name
          }`;
        })
        .join(',');

      startCurrenciesTransition(() => {
        void router.replace(
          `/wallet?${toQueryString('base', newBaseCurrencyParam)}`,
          { forceOptimisticNavigation: true },
        );
      });
    },
    [router, startCurrenciesTransition, toQueryString, walletBaseCurrencies],
  );

  const removeCurrency = useCallback(
    (walletBaseCurrencyName: Currency) => {
      const newBaseCurrencyParam = walletBaseCurrencies
        .filter((c) => c.name !== walletBaseCurrencyName) //removed selected currency from new list of base currencies
        .map((c) => `${substituePotentialNaNToZero(c.amount)}${c.name}`)
        .join(',');

      void router.replace(
        `/wallet?${toQueryString('base', newBaseCurrencyParam)}`,
        { forceOptimisticNavigation: true },
      );
    },
    [router, toQueryString, walletBaseCurrencies],
  );

  return { onInputChange, removeCurrency };
};
