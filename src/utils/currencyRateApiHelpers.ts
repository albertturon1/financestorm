import { Currency } from '@interfaces/ICurrency';
import {
  CurrenciesRates,
  ExchangeRateTimeseriesRatesArray,
  ExchangeRateTimeseriesResponse,
  SeparateDailyCurrencyRates,
  ExchangeRateTimeseriesResponseRates,
} from '@interfaces/models/IExchangerate';

import { inverseCurrencyRate } from './misc';

const convertDayRates = (day: CurrenciesRates, quoteCurrency: Currency) =>
  Object.entries(day).reduce((acc, rate) => {
    const [key, value] = rate;
    if (key !== quoteCurrency) {
      acc[key as keyof CurrenciesRates] = inverseCurrencyRate(value);
    }
    return acc;
  }, {} as CurrenciesRates);

//rates object to array with infersions of daily rates
export const convertDailyCurrencyRatesToArray = (
  rates: ExchangeRateTimeseriesResponseRates,
  quoteCurrency: Currency,
) =>
  Object.entries(rates).reduce((acc, day) => {
    const [dayLabel, dayRates] = day;

    acc.push({
      date: dayLabel,
      rates: convertDayRates(dayRates, quoteCurrency), //might be empty object when no rates are passed
    });
    return acc;
  }, [] as ExchangeRateTimeseriesRatesArray[]);

//rates object to separate arrays of currencies with infersions of daily rates
export const separateDailyCurrencyRates = (
  data: ExchangeRateTimeseriesResponse,
) => {
  const rates = Object.entries(data.rates[data.start_date]).map(
    ([currency, rate]) => ({
      quote_currency: data.base,
      base_currency: currency as Currency,
      rates: [{ date: data.start_date, value: inverseCurrencyRate(rate) }],
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
          value: inverseCurrencyRate(rate),
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
