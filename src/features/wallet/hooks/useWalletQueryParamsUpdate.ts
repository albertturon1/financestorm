'use client';

import { useCallback, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  useWalletTimespan,
  useWalletQuoteCurrency,
  useWalletBaseCurrencies,
} from '@src/zustand/walletStore';
import { createQueryString } from '@utils/misc';

const useWalletQueryParamsUpdate = () => {
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
    void router.replace(
      `/wallet?${toQueryString(
        'quote',
        `${walletQuoteCurrency.amount}${walletQuoteCurrency.name}`,
      )}`,
      {
        forceOptimisticNavigation: true,
      },
    );
  }, [router, toQueryString, walletQuoteCurrency]);

  useEffect(() => {
    const base = walletBaseCurrencies
      .map((c) => `${c.amount}${c.name}`)
      .join(',');

    void router.replace(`/wallet?${toQueryString('base', base)}`, {
      forceOptimisticNavigation: true,
    });
  }, [router, toQueryString, walletBaseCurrencies]);

  useEffect(() => {
    void router.replace(`/wallet?${toQueryString('timespan', timespan)}`, {
      forceOptimisticNavigation: true,
    });
  }, [router, timespan, toQueryString]);
};

export default useWalletQueryParamsUpdate;
