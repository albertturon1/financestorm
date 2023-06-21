import { useEffect, useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Timespan } from '@interfaces/ICharts';
import { WalletCurrency } from '@src/zustand/walletStore';
import { createQueryString, substituePotentialNaNToZero } from '@utils/misc';

const useReplaceInvalidWalletParams = ({
  isValidQuoteCurrency,
  walletQuoteCurrency,
  isValidTimespan,
  timespan,
  isValidBaseCurrencies,
}: {
  walletQuoteCurrency: WalletCurrency;
  isValidQuoteCurrency: boolean;
  isValidTimespan: boolean;
  isValidBaseCurrencies: boolean;
  timespan: Timespan;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toQueryString = useCallback(
    (param: string, value: string) =>
      createQueryString({ param, value, searchParams }),
    [searchParams],
  );

  //quote
  useEffect(() => {
    if (!isValidQuoteCurrency) {
      const newQuoteCurrencyParam = toQueryString(
        'quote',
        `${substituePotentialNaNToZero(walletQuoteCurrency.amount)}${
          walletQuoteCurrency.name
        }`,
      );

      void router.replace(`/wallet?${newQuoteCurrencyParam}`, {
        forceOptimisticNavigation: true,
      });
    }
  }, [
    isValidQuoteCurrency,
    walletQuoteCurrency.amount,
    walletQuoteCurrency.name,
    router,
    toQueryString,
  ]);

  useEffect(() => {
    if (!isValidTimespan) {
      const newTimespanParam = toQueryString('timespan', timespan);

      void router.replace(`/wallet?${newTimespanParam}`, {
        forceOptimisticNavigation: true,
      });
    }
  }, [isValidTimespan, router, timespan, toQueryString]);

  //base
  useEffect(() => {
    if (!isValidBaseCurrencies) {
      const params = new URLSearchParams(
        searchParams as unknown as URLSearchParams,
      );
      params.delete('base'); //delete base from params

      void router.replace(`/wallet?${params.toString()}`, {
        forceOptimisticNavigation: true,
      });
    }
  }, [isValidBaseCurrencies, router, searchParams]);
};

export default useReplaceInvalidWalletParams;
