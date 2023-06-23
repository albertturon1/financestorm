import { Currency } from '@interfaces/ICurrency';
import {
  CurrenciesRates,
  ExchangeRateTimeseriesRatesArray,
  ExchangeRateTimeseriesResponse,
  SeparateDailyCurrencyRates,
  ExchangeRateTimeseriesResponseRates,
} from '@interfaces/models/IExchangerate';

import { inverseCurrencyRate, objectEntries, objectKeys } from './misc';

const convertDayRates = (day: CurrenciesRates, quoteCurrency: Currency) =>
  objectEntries(day).reduce((acc, rate) => {
    const [key, value] = rate;
    if (key !== quoteCurrency) {
      acc[key] = inverseCurrencyRate(value);
    }
    return acc;
  }, {} as CurrenciesRates);

//rates object to array with infersions of daily rates
export const convertDailyCurrencyRatesToArray = (
  rates: ExchangeRateTimeseriesResponseRates,
  quoteCurrency: Currency,
) =>
  objectEntries(rates).reduce((acc, day) => {
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
  const rates = objectEntries(data.rates[data.start_date]).map(
    ([currency, rate]) => ({
      quote_currency: data.base,
      base_currency: currency,
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

  objectEntries(data.rates)
    .slice(1) //first one has already been used
    .forEach((day) => {
      const [dayLabel, dayRates] = day;
      if (!objectKeys(dayRates).length) return; //return when there's no data for the day

      objectEntries(dayRates).forEach(([currency, rate]) => {
        const currencyIndexInAcc = currencyIndexes[currency];
        rates[currencyIndexInAcc].rates.push({
          date: dayLabel,
          value: inverseCurrencyRate(rate),
        });
      });
    });

  const base_currencies = objectKeys(currencyIndexes);

  const { base, motd, success, ...rest } = data;

  return {
    ...rest,
    quote_currency: data.base,
    base_currencies,
    rates_array: rates,
  };
};
