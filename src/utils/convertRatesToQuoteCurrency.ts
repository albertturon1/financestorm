import { Currencies } from '@interfaces/ICurrency';
import {
  CurrencyRate,
  ExchangeRateLatestResponse,
  ExchangeRateTimeseriesResponse,
  ExchangeRateTimeseriesResponseRates,
} from '@interfaces/models/IExchangerate';

export const isExchangeRateTimeseriesResponse = (
  data: ExchangeRateLatestResponse | ExchangeRateTimeseriesResponse,
): data is ExchangeRateTimeseriesResponse =>
  (data as ExchangeRateTimeseriesResponse).timeseries !== undefined;

const convertDayRates = (day: CurrencyRate, quoteCurrency: Currencies) => {
  const rates = {} as CurrencyRate;
  Object.entries(day).forEach((rate) => {
    const [key, value] = rate;
    if (key === quoteCurrency) return; //skip quoteCurrency
    rates[key as Currencies] = value ** -1;
  });
  return rates;
};

const convertRatesToQuoteCurrency = <
  T extends ExchangeRateLatestResponse | ExchangeRateTimeseriesResponse,
>(
  data: T | undefined,
) => {
  if (!data) return;
  const rates = !isExchangeRateTimeseriesResponse(data)
    ? convertDayRates(data.rates, data.base)
    : Object.entries(data.rates).map((day) => {
        const convertedDayRates = {} as ExchangeRateTimeseriesResponseRates;
        const [dayLabel, dayRates] = day;
        convertedDayRates[dayLabel] = convertDayRates(dayRates, data.base);
        return convertedDayRates;
      });

  return { ...data, rates };
};

export default convertRatesToQuoteCurrency;
