'use client';

import { useQuery } from '@tanstack/react-query';

import {
  getDailyCurrencyTimeseriesOneYearQuery,
  getTodayCurrencyRatesQuery,
} from '../CurrenctyRateApi';
import {
  DailyCurrencyRatesTimeseriesRequest,
  MultiCurrenciesRate,
} from '../interfaces/ICurrenctyRateApi';
import { CURRENCY_RATE_KEYS } from '../queryKeys/CurrencyRateKeys';

export const useGetTodayCurrencyRatesQuery = (props: MultiCurrenciesRate) =>
  useQuery(
    ['todayCurrencyRates', props],
    () => getTodayCurrencyRatesQuery(props),
    { enabled: !!props.base_currencies.length && !!props.base_currencies },
  );

export const useDailyCurrencyRatesQuery = (
  props: DailyCurrencyRatesTimeseriesRequest,
) =>
  useQuery({
    queryKey: CURRENCY_RATE_KEYS.dailyCurrencyTimeseriesOneYear(props),
    queryFn: () => getDailyCurrencyTimeseriesOneYearQuery(props),
    enabled: !!props.base_currencies.length && !!props.base_currencies,
    staleTime: 24 * 60 * 1000,
  });
