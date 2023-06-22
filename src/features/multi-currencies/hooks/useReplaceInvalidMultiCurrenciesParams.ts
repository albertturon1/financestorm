import { useEffect, useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { DEFAULT_BASE_CURRENCIES, DEFAULT_QUOTE_CURRENCY } from '@constants/currencies';
import { createQueryString } from '@utils/misc';

export const useReplaceInvalidMultiCurrenciesParams = ({
  isValidQuoteCurrencyFromParams,
  isValidBaseCurrenciesFromParams,
}: {
  isValidQuoteCurrencyFromParams: boolean;
  isValidBaseCurrenciesFromParams: boolean;
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
    if (!isValidQuoteCurrencyFromParams) {
      const newQuoteCurrencyParam = toQueryString(
        'quote', DEFAULT_QUOTE_CURRENCY,
      );

      void router.push(`/multi-currencies?${newQuoteCurrencyParam}`, {
        forceOptimisticNavigation: true,
      });
    }
  }, [
    isValidQuoteCurrencyFromParams,
    router,
    toQueryString,
  ]);

  //base
  useEffect(() => {
    if (!isValidBaseCurrenciesFromParams) {
      const baseCurrenciesString = DEFAULT_BASE_CURRENCIES
        .join(',');

      const newBaseCurrenciesParam = toQueryString(
        'base', baseCurrenciesString,
      );

      void router.push(`/multi-currencies?${newBaseCurrenciesParam}`, {
        forceOptimisticNavigation: true,
      });
    }
  }, [isValidBaseCurrenciesFromParams, router, toQueryString]);
};
