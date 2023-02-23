import {
  ExchangeRateLatestResponse,
  ExchangeRateTimeseriesResponse,
} from '@interfaces/models/IExchangerate';
import convertRatesToQuoteCurrency from '@utils/convertRatesToQuoteCurrency';
import keysBuilder from '@utils/reactQuery/keysBuilder';
import useFetch from '@utils/reactQuery/useFetch';

import { dateArgs } from '../CurrenctyRateApi';
import {
  DailyCurrencyRatesTimeseriesRequest,
  MultiCurrenciesRate,
} from '../interfaces/ICurrenctyRateApi';

const keys = keysBuilder(
  {
    dailyCurrencyRatesTimeseries: ({
      base_currencies,
      quote_currency,
    }: MultiCurrenciesRate) => [...base_currencies, quote_currency],
    todayCurrencyRates: (params: DailyCurrencyRatesTimeseriesRequest) => [
      params,
    ],
  },
  'currencyRate',
);

export const useTodayCurrencyRatesQuery = (params: MultiCurrenciesRate) => {
  const response = useFetch<ExchangeRateTimeseriesResponse>({
    url: 'https://api.exchangerate.host/latest',
    params: {
      base: params.quote_currency,
      symbols: params.base_currencies?.join(',').toUpperCase(),
    },
    key: keys.todayCurrencyRates(params),
  });

  return {
    ...response,
    data: convertRatesToQuoteCurrency(response.data),
  };
};

export const useDailyCurrencyRatesTimeseriesQuery = (
  params: DailyCurrencyRatesTimeseriesRequest,
) => {
  const response = useFetch<ExchangeRateLatestResponse>({
    url: 'https://api.exchangerate.host/timeseries',
    params: {
      start_date: dateArgs(params.start_date),
      end_date: dateArgs(params.end_date),
      base: params.quote_currency,
      symbols: params.base_currency.toUpperCase(), //comma separated values
    },
    key: keys.todayCurrencyRates(params),
  });

  return {
    ...response,
    data: convertRatesToQuoteCurrency(response.data),
  };
};
