import _ from 'lodash';

import { ExchangerateTimeseriesResponse } from '@interfaces/models/IExchangerate';
import api from '@utils/api';
import { genQueryString } from '@utils/misc';

import { DailyCurrencyTimeseriesRequest } from './interfaces/ICurrenctyRateApi';

export const getDailyCurrencyTimeseries = async ({
  base,
  start_date,
  end_date,
  symbols,
}: DailyCurrencyTimeseriesRequest) => {
  const url = 'https://api.exchangerate.host/timeseries';
  const params = genQueryString({
    start_date,
    end_date,
    base,
    symbols: symbols?.join('-'),
  });

  return await api.get<ExchangerateTimeseriesResponse>(`${url}?${params}`);
};
