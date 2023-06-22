import { useEffect, useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Currency } from '@interfaces/ICurrency';
import { createQueryString } from '@utils/misc';

export const useReplaceInvalidCurrenciesParams = ({
  isValidQuoteCurrency,
  quoteCurrency,
}: {
  isValidQuoteCurrency: boolean;
  quoteCurrency: Currency;
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
      const newQuoteCurrencyParam = toQueryString('currency', quoteCurrency);

      void router.replace(`/currencies?${newQuoteCurrencyParam}`, {
        forceOptimisticNavigation: true,
      });
    }
  }, [isValidQuoteCurrency, quoteCurrency, router, toQueryString]);
};
