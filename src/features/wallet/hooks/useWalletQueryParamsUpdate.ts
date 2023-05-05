'use client';

import {
  useWalletTimespan,
  useWalletQuoteCurrencyName,
  useWalletBaseCurrenciesNames,
} from '@src/zustand/walletStore';
import { createQueryString } from '@utils/misc';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

const useWalletQueryParamsUpdate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timespan = useWalletTimespan();
  const walletQuoteCurrency = useWalletQuoteCurrencyName();
  const walletBaseCurrencies = useWalletBaseCurrenciesNames();

  const toQueryString = useCallback(
    (param: string, value: string) =>
      createQueryString({ param, value, searchParams }),
    [searchParams],
  );

  useEffect(() => {
    void router.push(`/wallet?${toQueryString('quote', walletQuoteCurrency)}`, {
      forceOptimisticNavigation: true,
    });
  }, [walletQuoteCurrency]);

  useEffect(() => {
    void router.push(
      `/wallet?${toQueryString('base', walletBaseCurrencies.join(','))}`,
      {
        forceOptimisticNavigation: true,
      },
    );
  }, [walletBaseCurrencies]);

  useEffect(() => {
    console.log('timespan: ', timespan);
    void router.push(`/wallet?${toQueryString('timespan', timespan)}`, {
      forceOptimisticNavigation: true,
    });
  }, [timespan]);
};

export default useWalletQueryParamsUpdate;
