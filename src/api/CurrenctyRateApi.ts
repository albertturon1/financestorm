import _ from 'lodash';

import { ExchangeRateTimeseriesResponse } from '@interfaces/models/IExchangerate';
import api from '@utils/api';
import { genQueryString, getNDaysPastServerDate } from '@utils/misc';

import {
  CurrencyRatePair,
  DailyCurrencyTimeseriesRequest,
} from './interfaces/ICurrenctyRateApi';

export const getDailyCurrencyTimeseries = async ({
  base_currency,
  start_date,
  end_date,
  quote_currency,
}: DailyCurrencyTimeseriesRequest) => {
  //api after 00:00 UTC become unavailable
  const currentHour = new Date().getUTCHours();
  const today = getNDaysPastServerDate(0);

  const dateArgs = (date: string) =>
    date === today && currentHour === 0 ? getNDaysPastServerDate(1) : date;

  const url = 'https://api.exchangerate.host/timeseries';
  const params = genQueryString({
    start_date: dateArgs(start_date),
    end_date: dateArgs(end_date),
    base: base_currency,
    symbols: quote_currency?.toUpperCase(), //comma separated values
  });

  return await api.get<ExchangeRateTimeseriesResponse>(`${url}?${params}`);
};

export const getTodayCurrencies = async ({
  base_currency,
  quote_currency,
}: CurrencyRatePair) => {
  const url = 'https://api.exchangerate.host/latest';
  const params = genQueryString({
    base: base_currency,
    symbols: quote_currency?.toUpperCase(), //comma separated values
  });

  return await api.get<ExchangeRateTimeseriesResponse>(`${url}?${params}`);
};
