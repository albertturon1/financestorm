import { Currency } from '@interfaces/ICurrency';
import {
  CurrenciesRates,
  ExchangeRateLatestResponse,
  ExchangeRateTimeseriesRatesArray,
  ExchangeRateTimeseriesResponse,
  ExchangeRateTimeseries,
  SeparateDailyCurrencyRates,
} from '@interfaces/models/IExchangerate';

import { cutNumber } from './misc';

export const isExchangeRateTimeseriesResponse = (
  data: ExchangeRateLatestResponse | ExchangeRateTimeseriesResponse,
): data is ExchangeRateTimeseriesResponse =>
  (data as ExchangeRateTimeseriesResponse).timeseries !== undefined;

function inverseCurrecyRate(rate: number) {
  const newValue = rate ** -1;
  return cutNumber(newValue, newValue < 1 ? 5 : 3);
}

const convertDayRates = (day: CurrenciesRates, quoteCurrency: Currency) =>
  Object.entries(day).reduce((acc, rate) => {
    const [key, value] = rate;
    if (key !== quoteCurrency) {
      acc[key as keyof CurrenciesRates] = inverseCurrecyRate(value);
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

  const base_currencies = Object.keys(rates[0].rates) as Currency[];

  const { base, motd, success, ...rest } = data;

  return {
    ...rest,
    quote_currency: data.base,
    base_currencies,
    rates_array: rates,
  };
};

export const separateToDailyCurrencyRates = (
  data: ExchangeRateTimeseriesResponse,
) => {
  const rates = Object.entries(data.rates[data.start_date]).map(
    ([currency, rate]) => ({
      quote_currency: data.base,
      base_currency: currency as Currency,
      rates: [{ date: data.start_date, value: inverseCurrecyRate(rate) }],
    }),
  ) satisfies SeparateDailyCurrencyRates[];

  const currencyIndexes = rates.reduce((acc, currency) => {
    {
      acc[currency.base_currency] = rates.findIndex(
        (b) => b.base_currency === currency.base_currency,
      );
      return acc;
    }
  }, {} as Record<Currency, number>);

  Object.entries(data.rates)
    .slice(1) //first one has already been used
    .forEach((day) => {
      const [dayLabel, dayRates] = day;
      if (!Object.keys(dayRates).length) return; //return when there's no data for the day

      Object.entries(dayRates).forEach(([currency, rate]) => {
        const currencyIndexInAcc = currencyIndexes[currency as Currency];
        rates[currencyIndexInAcc].rates.push({
          date: dayLabel,
          value: inverseCurrecyRate(rate),
        });
      });
    });

  const base_currencies = Object.keys(currencyIndexes) as Currency[];

  const { base, motd, success, ...rest } = data;

  return {
    ...rest,
    quote_currency: data.base,
    base_currencies,
    rates_array: rates,
  };
};
