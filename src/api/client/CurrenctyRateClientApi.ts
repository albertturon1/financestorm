'use client';

import { useQuery } from '@tanstack/react-query';

import {
  dailyCurrencyRatesQuery,
  todayCurrencyRatesQuery,
} from '../CurrencyRateApi';
import {
  PrefetchDailyCurrencyRatesRequest,
  PrefetchTodayCurrencyRatesRequest,
} from '../interfaces/ICurrencyRateApi';
import { CURRENCY_RATE_KEYS } from '../queryKeys/CurrencyRateKeys';

export const useTodayCurrencyRatesQuery = ({
  queryParams,
  queryOptions,
}: PrefetchTodayCurrencyRatesRequest) =>
  useQuery({
    queryKey: CURRENCY_RATE_KEYS.todayCurrencyRates(queryParams),
    queryFn: () => todayCurrencyRatesQuery(queryParams),
    ...queryOptions,
  });

export const useDailyCurrencyRatesQuery = ({
  queryParams,
  queryOptions,
}: PrefetchDailyCurrencyRatesRequest) =>
  useQuery({
    queryKey: CURRENCY_RATE_KEYS.dailyCurrencyTimeseriesOneYear(queryParams),
    queryFn: () => dailyCurrencyRatesQuery(queryParams),
    ...queryOptions,
  });
