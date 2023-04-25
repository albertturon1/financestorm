'use client';

import { useQuery } from '@tanstack/react-query';

import {
  dailyCurrencyRatesQuery,
  getTodayCurrencyRatesQuery,
} from '../CurrenctyRateApi';
import {
  MultiCurrenciesRate,
  PrefetchDailyCurrencyRatesRequest,
} from '../interfaces/ICurrenctyRateApi';
import { CURRENCY_RATE_KEYS } from '../queryKeys/CurrencyRateKeys';

export const useGetTodayCurrencyRatesQuery = (props: MultiCurrenciesRate) =>
  useQuery(
    ['todayCurrencyRates', props],
    () => getTodayCurrencyRatesQuery(props),
    { enabled: !!props.base_currencies.length && !!props.base_currencies },
  );

export const useDailyCurrencyRatesQuery = ({
  queryParams,
  queryOptions,
}: PrefetchDailyCurrencyRatesRequest) =>
  useQuery({
    queryKey: CURRENCY_RATE_KEYS.dailyCurrencyTimeseriesOneYear(queryParams),
    queryFn: () => dailyCurrencyRatesQuery(queryParams),
    ...queryOptions,
  });
