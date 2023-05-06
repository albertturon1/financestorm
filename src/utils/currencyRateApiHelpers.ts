import { DateTime } from 'luxon';

import { SERVER_DATE } from '@constants/dateTime';
import { DEFAULT_TIMESPAN, TIMESPANS } from '@constants/timespans';
import { ChartMultiData } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import {
  CurrenciesRates,
  ExchangeRateLatestResponse,
  ExchangeRateTimeseriesRatesArray,
  ExchangeRateTimeseriesResponse,
  ExchangeRateTimeseries,
  SeparateDailyCurrencyRates,
  NormalizedCurrencyExchangeRate,
} from '@interfaces/models/IExchangerate';
import { getDailyCurrencyTimeseriesOneYearQuery } from '@src/api/CurrencyRateApi';
import { CurrencyRateRange } from '@src/api/interfaces/ICurrencyRateApi';
import { dateDiff } from '@utils/misc';

import { inverseCurrecyRate } from './misc';

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

export const convertDailyCurrencyTimeseriesToChartData = (
  data: ExchangeRateTimeseries | undefined,
) => {
  if (!data) return [];
  return data.rates_array.reduce((acc, day) => {
    const { date, rates } = day;
    Object.entries(rates).forEach(([currency, value]) => {
      const currencyIndexInAcc = acc.findIndex((c) => c.name === currency);
      const obj: NormalizedCurrencyExchangeRate = {
        base_currency: currency as Currency,
        quote_currency: data.quote_currency,
        value,
        date,
      };

      if (currencyIndexInAcc === -1)
        acc.push({
          name: currency,
          //minValue: value,
          //maxValue: value,
          data: [obj],
        });
      else {
        ////set minValue
        //if (value > acc[currencyIndexInAcc].maxValue)
        //  acc[currencyIndexInAcc].maxValue = value;
        ////set maxValue
        //if (value < acc[currencyIndexInAcc].minValue)
        //  acc[currencyIndexInAcc].minValue = value;
        acc[currencyIndexInAcc].data = [...acc[currencyIndexInAcc].data, obj];
      }
    });
    return acc;
  }, [] as ChartMultiData<NormalizedCurrencyExchangeRate>[]);
};

export type DailyMultiCurrencyDataProps = {
  quote_currency: Currency;
  start_date?: string;
  end_date?: string;
  base_currencies: Currency[];
};

const dailyCurrencyTimeseriesYears = async ({
  base_currencies, //waluty od których liczysz wartości np eur/PLN
  quote_currency,
  start_date,
  end_date = TIMESPANS[DEFAULT_TIMESPAN],
}: DailyMultiCurrencyDataProps) => {
  const startDate =
    start_date ??
    DateTime.fromISO(end_date).minus({ years, days: -1 }).toFormat(SERVER_DATE);

  const { years: y } = dateDiff(startDate, end_date, 'years');
  const yearsNum = years ?? Math.ceil(y ?? 1);
  const yearsPairs: CurrencyRateRange[] = [];
  let currentEndDate = DateTime.fromISO(end_date).toFormat(SERVER_DATE);

  for (let i = 0; i < yearsNum; i++) {
    if (i === yearsNum - 1) {
      yearsPairs.push({
        start_date: startDate,
        end_date: currentEndDate,
      });
      break;
    }

    const loopStartDate = DateTime.fromISO(currentEndDate)
      .minus({ years: 1, day: -1 })
      .toFormat(SERVER_DATE);

    yearsPairs.push({
      start_date: loopStartDate,
      end_date: currentEndDate,
    });

    currentEndDate = DateTime.fromISO(currentEndDate)
      .minus({ years: 1 })
      .toFormat(SERVER_DATE);
  }

  const api_responses = await Promise.all(
    yearsPairs.map((dates) =>
      getDailyCurrencyTimeseriesOneYearQuery({
        ...dates,
        base_currencies,
        quote_currency,
      }),
    ),
  );

  return api_responses.filter(Boolean).reduce((acc, item, index) => {
    // eslint-disable-next-line no-param-reassign
    if (index === 0) acc = item;
    else {
      acc.end_date = end_date;
      acc.start_date = startDate;
      acc.rates = { ...acc.rates, ...item.rates };
      acc.rates_array = acc.rates_array.concat(item.rates_array);
    }
    return acc;
  }, {} as ExchangeRateTimeseries);
};

export default dailyCurrencyTimeseriesYears;
