import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import {
  DEFAULT_BASE_CURRENCIES,
  DEFAULT_QUOTE_CURRENCY,
} from '@constants/currencies';
import { useModifySearchParams } from '@hooks/useModifySearchParams';
import { Timespan } from '@interfaces/ICharts';

export const useReplaceInvalidMultiCurrenciesParams = ({
  isValidQuoteCurrencyFromParams,
  isValidBaseCurrenciesFromParams,
  isValidTimespan,
  timespan,
}: {
  isValidQuoteCurrencyFromParams: boolean;
  isValidBaseCurrenciesFromParams: boolean;
  isValidTimespan: boolean;
  timespan: Timespan;
}) => {
  const router = useRouter();

  const toQueryString = useModifySearchParams();

  //quote
  useEffect(() => {
    if (!isValidQuoteCurrencyFromParams) {
      const newQuoteCurrencyParam = toQueryString(
        'quote',
        DEFAULT_QUOTE_CURRENCY,
      );

      void router.push(`/multi-currencies?${newQuoteCurrencyParam}`, {
        forceOptimisticNavigation: true,
      });
    }
  }, [isValidQuoteCurrencyFromParams, router, toQueryString]);

  //timespan
  useEffect(() => {
    if (!isValidTimespan) {
      const newTimespanParam = toQueryString('timespan', timespan);

      void router.replace(`/multi-currencies?${newTimespanParam}`, {
        forceOptimisticNavigation: true,
      });
    }
  }, [isValidTimespan, router, timespan, toQueryString]);

  //base
  useEffect(() => {
    if (!isValidBaseCurrenciesFromParams) {
      const baseCurrenciesString = DEFAULT_BASE_CURRENCIES.join(',');

      const newBaseCurrenciesParam = toQueryString(
        'base',
        baseCurrenciesString,
      );

      void router.push(`/multi-currencies?${newBaseCurrenciesParam}`, {
        forceOptimisticNavigation: true,
      });
    }
  }, [isValidBaseCurrenciesFromParams, router, toQueryString]);
};
