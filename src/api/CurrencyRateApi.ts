import { dehydrate } from '@tanstack/react-query';

import {
  ExchangeRateLatestResponse,
  ExchangeRateTimeseriesResponse,
} from '@interfaces/models/IExchangerate';
import api from '@utils/api';
import {
  convertLastestRatesToQuoteCurrency,
  convertTimeseriesRatesToQuoteCurrency,
} from '@utils/convertRatesToQuoteCurrency';
import getQueryClient from '@utils/getQueryClient';
import { genQueryString } from '@utils/misc';

import {
  DailyCurrencyRatesRequest,
  MultiCurrenciesRate,
  PrefetchDailyCurrencyRatesRequest,
  PrefetchTodayCurrencyRatesRequest,
} from './interfaces/ICurrencyRateApi';
import { CURRENCY_RATE_KEYS } from './queryKeys/CurrencyRateKeys';

export const getDailyCurrencyTimeseriesOneYearQuery = async ({
  base_currencies,
  start_date,
  end_date,
  quote_currency,
}: DailyCurrencyRatesRequest) => {
  const url = `${process.env.NEXT_PUBLIC_EXCHANGERATE_URL ?? ''}/timeseries?`;
  const params = genQueryString({
    start_date,
    end_date,
    base: quote_currency,
    symbols: base_currencies.join(',').toUpperCase(), //comma separated values
  });

  const data = await api.get<ExchangeRateTimeseriesResponse>(`${url}${params}`);
  if (!data) return;
  return convertTimeseriesRatesToQuoteCurrency(data);
};

export const dailyCurrencyRatesQuery = async ({
  base_currencies,
  start_date,
  end_date,
  quote_currency,
}: DailyCurrencyRatesRequest) => {
  const url = `${process.env.NEXT_PUBLIC_EXCHANGERATE_URL ?? ''}/timeseries?`;
  const params = genQueryString({
    start_date,
    end_date,
    base: quote_currency,
    symbols: base_currencies.join(',').toUpperCase(), //comma separated values
  });

  return await api.get<ExchangeRateTimeseriesResponse>(`${url}${params}`);
};

export const todayCurrencyRatesQuery = async (props: MultiCurrenciesRate) => {
  const url = `${process.env.NEXT_PUBLIC_EXCHANGERATE_URL ?? ''}/latest`;
  const params = genQueryString({
    base: props.quote_currency,
    symbols: props.base_currencies?.join(',')?.toUpperCase(), //comma separated values
  });

  return await api.get<ExchangeRateLatestResponse>(`${url}?${params}`);
};

export const getTodayCurrencyRatesQuery = async (
  props: MultiCurrenciesRate,
) => {
  const url = `${process.env.NEXT_PUBLIC_EXCHANGERATE_URL ?? ''}/latest?`;
  const params = genQueryString({
    base: props.quote_currency,
    symbols: props.base_currencies?.join(',')?.toUpperCase(), //comma separated values
  });

  const data = await api.get<ExchangeRateLatestResponse>(`${url}${params}`);
  if (!data) return;
  return convertLastestRatesToQuoteCurrency(data);
};

export const prefetchTodayCurrencyRatesQuery = async ({
  queryParams,
  queryOptions,
}: PrefetchTodayCurrencyRatesRequest) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: CURRENCY_RATE_KEYS.todayCurrencyRates(queryParams),
    queryFn: () => todayCurrencyRatesQuery(queryParams),
    ...queryOptions,
  });

  return dehydrate(queryClient);
};

export const prefetchDailyCurrencyRatesQuery = async ({
  queryParams,
  queryOptions,
}: PrefetchDailyCurrencyRatesRequest) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: CURRENCY_RATE_KEYS.dailyCurrencyTimeseriesOneYear(queryParams),
    queryFn: () => dailyCurrencyRatesQuery(queryParams),
    ...queryOptions,
  });

  return dehydrate(queryClient);
};
