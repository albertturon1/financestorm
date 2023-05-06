'use client';

import { useQuery } from '@tanstack/react-query';

import {
  dailyCurrencyRatesOverYearQuery,
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
    queryKey: CURRENCY_RATE_KEYS.dailyCurrencyRates(queryParams),
    queryFn: () => dailyCurrencyRatesQuery(queryParams),
    ...queryOptions,
  });

export const useDailyCurrencyRatesOverYearQuery = ({
  queryParams,
  queryOptions,
}: PrefetchDailyCurrencyRatesRequest) =>
  useQuery({
    queryKey: CURRENCY_RATE_KEYS.dailyCurrencyRatesOverYear(queryParams),
    queryFn: () => dailyCurrencyRatesOverYearQuery(queryParams),
    ...queryOptions,
  });
