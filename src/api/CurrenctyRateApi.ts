import {
  ExchangeRateLatestResponse,
  ExchangeRateTimeseriesResponse,
} from '@interfaces/models/IExchangerate';
import api from '@utils/api';
import {
  convertLastestRatesToQuoteCurrency,
  convertTimeseriesRatesToQuoteCurrency,
} from '@utils/convertRatesToQuoteCurrency';
import { genQueryString, getNDaysPastServerDate } from '@utils/misc';

import {
  DailyCurrencyRatesTimeseriesRequest,
  MultiCurrenciesRate,
} from './interfaces/ICurrenctyRateApi';

//api after 00:00 UTC become unavailable
export const dateArgs = (date: string) => {
  const currentHour = new Date().getUTCHours();
  const today = getNDaysPastServerDate(0);

  return date === today && currentHour === 0 ? getNDaysPastServerDate(1) : date;
};

export const getDailyCurrencyTimeseries = async ({
  base_currencies,
  start_date,
  end_date,
  quote_currency,
}: DailyCurrencyRatesTimeseriesRequest) => {
  const url = 'https://api.exchangerate.host/timeseries?';
  const params = genQueryString({
    start_date: dateArgs(start_date),
    end_date: dateArgs(end_date),
    base: quote_currency,
    symbols: base_currencies.join(',').toUpperCase(), //comma separated values
  });

  const data = await api.get<ExchangeRateTimeseriesResponse>(`${url}${params}`);
  return convertTimeseriesRatesToQuoteCurrency(data);
};

export const getTodayCurrencyRatesQuery = async (
  props: MultiCurrenciesRate,
) => {
  const url = 'https://api.exchangerate.host/latest?';
  const params = genQueryString({
    base: props.quote_currency,
    symbols: props.base_currencies?.join(',')?.toUpperCase(), //comma separated values
  });

  const data = await api.get<ExchangeRateLatestResponse>(`${url}${params}`);
  return convertLastestRatesToQuoteCurrency(data);
};
