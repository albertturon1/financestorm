import { dehydrate } from '@tanstack/react-query';
import { DateTime } from 'luxon';

import { SERVER_DATE } from '@constants/dateTime';
import {
  ExchangeRateLatestResponse,
  ExchangeRateTimeseriesResponse,
} from '@interfaces/models/IExchangerate';
import api from '@utils/api';
import {
  filterDayCurrencyRates,
  filterTimeseriesResponseRates,
} from '@utils/filterCurrencyRates';
import getQueryClient from '@utils/getQueryClient';
import { genQueryString, objectKeys } from '@utils/misc';

import {
  CurrencyRateRange,
  DailyCurrencyRatesRequest,
  MultiCurrenciesRate,
  PrefetchDailyCurrencyRatesRequest,
  PrefetchTodayCurrencyRatesRequest,
} from './interfaces/ICurrencyRateApi';
import { CURRENCY_RATE_KEYS } from './queryKeys/CurrencyRateKeys';

//max range is 1 past year
export const getDailyCurrencyRatesQuery = async ({
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
  });

  const data = await api.get<ExchangeRateTimeseriesResponse>(`${url}${params}`);

  //using reduce instead of symbols: base_currencies to prevent refetching data with param change
  const rates = filterTimeseriesResponseRates(data?.rates, base_currencies);

  const baseLowerCase = data?.base.toLowerCase();
  return { ...data, rates, base: baseLowerCase } as typeof data;
};

export const prefetchGetDailyCurrencyRatesQuery = async ({
  queryParams,
  queryOptions,
}: PrefetchDailyCurrencyRatesRequest) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: CURRENCY_RATE_KEYS.dailyCurrencyRates(queryParams),
    queryFn: () => getDailyCurrencyRatesQuery(queryParams),
    ...queryOptions,
  });

  return dehydrate(queryClient);
};

//max range is database
export const getDailyCurrencyRatesOverYearQuery = async ({
  base_currencies,
  quote_currency,
  start_date,
  end_date,
}: DailyCurrencyRatesRequest) => {
  const startDateLuxon = DateTime.fromISO(start_date);
  const endDateLuxon = DateTime.fromISO(end_date);

  const diffYears = Math.ceil(endDateLuxon.diff(startDateLuxon, 'years').years); //how many years to fetch

  const firstStartDate =
    diffYears > 1
      ? endDateLuxon.minus({ years: 1 }).plus({ days: 1 }).toFormat(SERVER_DATE)
      : start_date;

  const yearsPairs: CurrencyRateRange[] = [
    { start_date: firstStartDate, end_date },
  ];

  //start from 1, 0 is already populated
  for (let i = 1; i < diffYears; i++) {
    yearsPairs.push({
      start_date: DateTime.fromISO(yearsPairs[i - 1].start_date)
        .minus({ years: 1 })
        .toFormat(SERVER_DATE),
      end_date: DateTime.fromISO(yearsPairs[i - 1].end_date)
        .minus({ years: 1 })
        .toFormat(SERVER_DATE),
    });
  }

  const api_responses = await Promise.all(
    yearsPairs.map(async (dates) => {
      const data = await getDailyCurrencyRatesQuery({
        ...dates,
        base_currencies,
        quote_currency,
      });
      if (!data || !objectKeys(data.rates).length) return;
      return data;
    }),
  );
  const currencyRatesSorted = api_responses
    .filter(Boolean)
    .sort((a, b) => (a.start_date > b.start_date ? 1 : -1));

  const data = {
    ...currencyRatesSorted[0],
    end_date: currencyRatesSorted.slice(-1)[0].end_date,
    start_date: currencyRatesSorted[0].start_date,
  } satisfies Omit<ExchangeRateTimeseriesResponse, 'rates'>;

  return currencyRatesSorted.reduce((acc, item) => {
    //start_date instead of item.start_date because item is only 1 year of data
    acc.start_date = start_date;
    Object.assign(acc.rates, item.rates);

    return acc;
  }, data as ExchangeRateTimeseriesResponse);
};

export const prefetchGetDailyCurrencyRatesOverYearQuery = async ({
  queryParams,
  queryOptions,
}: PrefetchDailyCurrencyRatesRequest) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: CURRENCY_RATE_KEYS.dailyCurrencyRatesOverYear(queryParams),
    queryFn: () => getDailyCurrencyRatesOverYearQuery(queryParams),
    ...queryOptions,
  });

  return dehydrate(queryClient);
};

export const getTodayCurrencyRatesQuery = async (
  props: MultiCurrenciesRate,
) => {
  const url = `${process.env.NEXT_PUBLIC_EXCHANGERATE_URL ?? ''}/latest`;
  const params = genQueryString({
    base: props.quote_currency,
  });

  const data = await api.get<ExchangeRateLatestResponse>(`${url}?${params}`);

  const rates = filterDayCurrencyRates(data?.rates, props.base_currencies);

  const baseLowerCase = data?.base.toLowerCase();
  return { ...data, rates, base: baseLowerCase } as typeof data;
};

export const prefetchGetTodayCurrencyRatesQuery = async ({
  queryParams,
  queryOptions,
}: PrefetchTodayCurrencyRatesRequest) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: CURRENCY_RATE_KEYS.todayCurrencyRates(queryParams),
    queryFn: () => getTodayCurrencyRatesQuery(queryParams),
    ...queryOptions,
  });

  return dehydrate(queryClient);
};
