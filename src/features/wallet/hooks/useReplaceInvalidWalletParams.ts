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
  walletBaseCurrencies,
}: {
  walletQuoteCurrency: WalletCurrency;
  walletBaseCurrencies: WalletCurrency[];
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

  useEffect(() => {
    if (!isValidBaseCurrencies) {
      const baseCurrenciesString = walletBaseCurrencies
        .map((wb) => `${wb.amount}${wb.name}`)
        .join(',');
      const newBaseCurrencyParam = toQueryString('base', baseCurrenciesString);

      void router.replace(`/wallet?${newBaseCurrencyParam}`, {
        forceOptimisticNavigation: true,
      });
    }
  }, [isValidBaseCurrencies, router, toQueryString, walletBaseCurrencies]);
};

export default useReplaceInvalidWalletParams;
