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

const convertDayRates = (day: CurrencyRate, quoteCurrency: Currencies) =>
  //console.log('day:', day);
  Object.entries(day).reduce((acc, rate) => {
    const [key, value] = rate;
    if (key !== quoteCurrency) acc[key as keyof CurrencyRate] = value ** -1;
    return acc;
  }, {} as CurrencyRate);
const convertRatesToQuoteCurrency = <
  T extends ExchangeRateLatestResponse | ExchangeRateTimeseriesResponse,
>(
  data: T | undefined,
) => {
  if (!data) return;
  const rates = !isExchangeRateTimeseriesResponse(data)
    ? convertDayRates(data.rates, data.base)
    : Object.entries(data.rates).reduce((acc, day) => {
        const [dayLabel, dayRates] = day;
        const chuj = convertDayRates(dayRates, data.base);
        acc[dayLabel] = chuj;
        //if (index === 0) console.log(acc);
        return acc;
      }, {} as ExchangeRateTimeseriesResponseRates);

  return { ...data, rates };
};

export default convertRatesToQuoteCurrency;
