'use client';

import { useCallback, useEffect, TransitionStartFunction } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  useWalletTimespan,
  useWalletQuoteCurrency,
  useWalletBaseCurrencies,
} from '@src/zustand/walletStore';
import { createQueryString, substitueNaNToZero } from '@utils/misc';

const useWalletQueryParamsUpdate = (
  startCurrenciesTransition: TransitionStartFunction,
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timespan = useWalletTimespan();
  const walletQuoteCurrency = useWalletQuoteCurrency();
  const walletBaseCurrencies = useWalletBaseCurrencies();

  const toQueryString = useCallback(
    (param: string, value: string) =>
      createQueryString({ param, value, searchParams }),
    [searchParams],
  );

  useEffect(() => {
    startCurrenciesTransition(() => {
      void router.replace(
        `/wallet?${toQueryString(
          'quote',
          `${substitueNaNToZero(walletQuoteCurrency.amount)}${
            walletQuoteCurrency.name
          }`,
        )}`,
        {
          forceOptimisticNavigation: true,
        },
      );
    });
  }, [router, toQueryString, walletQuoteCurrency, startCurrenciesTransition]);

  useEffect(() => {
    startCurrenciesTransition(() => {
      const base = walletBaseCurrencies
        .map((c) => `${substitueNaNToZero(c.amount)}${c.name}`)
        .join(',');

      void router.replace(`/wallet?${toQueryString('base', base)}`, {
        forceOptimisticNavigation: true,
      });
    });
  }, [startCurrenciesTransition, router, toQueryString, walletBaseCurrencies]);

  useEffect(() => {
    startCurrenciesTransition(() => {
      void router.replace(`/wallet?${toQueryString('timespan', timespan)}`, {
        forceOptimisticNavigation: true,
      });
    });
  }, [startCurrenciesTransition, router, timespan, toQueryString]);
};

export default useWalletQueryParamsUpdate;
