import {
  ExchangeRateLatestResponse,
  ExchangeRateTimeseriesResponse,
} from '@interfaces/models/IExchangerate';
import api from '@utils/api';
import {
  convertLastestRatesToQuoteCurrency,
  convertTimeseriesRatesToQuoteCurrency,
} from '@utils/convertRatesToQuoteCurrency';
import { genQueryString } from '@utils/misc';

import {
  DailyCurrencyRatesTimeseriesRequest,
  MultiCurrenciesRate,
} from './interfaces/ICurrenctyRateApi';

export const getDailyCurrencyTimeseriesOneYearQuery = async ({
  base_currencies,
  start_date,
  end_date,
  quote_currency,
}: DailyCurrencyRatesTimeseriesRequest) => {
  const url = `${process.env.NEXT_PUBLIC_EXCHANGERATE_URL ?? ''}/timeseries?`;
  const params = genQueryString({
    start_date,
    end_date,
    base: quote_currency,
    symbols: base_currencies.join(',').toUpperCase(), //comma separated values
  });

  const data = await api.get<ExchangeRateTimeseriesResponse>(`${url}${params}`);
  if (!data) return;
  return convertTimeseriesRatesToQuoteCurrency(data);
};

export const getTodayCurrencyRatesQuery = async (
  props: MultiCurrenciesRate,
) => {
  const url = `${process.env.NEXT_PUBLIC_EXCHANGERATE_URL ?? ''}/latest?`;
  const params = genQueryString({
    base: props.quote_currency,
    symbols: props.base_currencies?.join(',')?.toUpperCase(), //comma separated values
  });

  const data = await api.get<ExchangeRateLatestResponse>(`${url}${params}`);
  if (!data) return;
  return convertLastestRatesToQuoteCurrency(data);
};
