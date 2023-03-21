import { Currencies } from '@interfaces/ICurrency';
import {
  CurrenciesRates,
  ExchangeRateLatestResponse,
  ExchangeRateTimeseriesRatesArray,
  ExchangeRateTimeseriesResponse,
  ExchangeRateTimeseries,
} from '@interfaces/models/IExchangerate';

import { cutNumber } from './misc';

export const isExchangeRateTimeseriesResponse = (
  data: ExchangeRateLatestResponse | ExchangeRateTimeseriesResponse,
): data is ExchangeRateTimeseriesResponse =>
  (data as ExchangeRateTimeseriesResponse).timeseries !== undefined;

const convertDayRates = (day: CurrenciesRates, quoteCurrency: Currencies) =>
  Object.entries(day).reduce((acc, rate) => {
    const [key, value] = rate;
    if (key !== quoteCurrency) {
      const newValue = value ** -1;
      acc[key as keyof CurrenciesRates] = cutNumber(
        newValue,
        newValue < 1 ? 5 : 3,
      );
    }
    return acc;
  }, {} as CurrenciesRates);

export const convertLastestRatesToQuoteCurrency = (
  data: ExchangeRateLatestResponse,
): ExchangeRateLatestResponse => {
  const rates = convertDayRates(data.rates, data.base);
  return { ...data, rates };
};

export const convertTimeseriesRatesToQuoteCurrency = (
  data: ExchangeRateTimeseriesResponse,
): ExchangeRateTimeseries => {
  const rates = Object.entries(data.rates).reduce((acc, day) => {
    const [dayLabel, dayRates] = day;
    if (!Object.keys(dayRates).length) return acc; //return when there's no data for the day

    acc.push({ date: dayLabel, rates: convertDayRates(dayRates, data.base) });
    return acc;
  }, [] as ExchangeRateTimeseriesRatesArray[]);

  const base_currencies = Object.keys(rates[0].rates) as Currencies[];

  const { base, motd, success, ...rest } = data;

  return {
    ...rest,
    quote_currency: data.base,
    base_currencies,
    rates_array: rates,
  };
};
