import _ from 'lodash';

import {
  CurrencyRatePairRequest,
  CurrentCurrencyRatePairResponse,
  DailyCurrencyRateResponse,
  MonthlyCurrencyRateResponse,
} from '@interfaces/api/ICurrenctyRateApi';
import api from '@utils/api';
import { API_KEYS } from '@utils/axios';
import { genQueryString } from '@utils/misc';

const url = process.env.APLHA_URL as string;
//const apikey = process.env.APLHA_KEY as string;
const apikey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];

export const getCurrentCurrencyRatePair = async ({
  baseCurrency,
  quoteCurrency,
}: CurrencyRatePairRequest) => {
  const params = genQueryString({
    from_currency: baseCurrency,
    to_currency: quoteCurrency,
    function: 'CURRENCY_EXCHANGE_RATE',
    apikey,
  });

  return await api.get<CurrentCurrencyRatePairResponse>(`${url}?${params}`);
};

export const getDailyCurrencyRatePair = async ({
  baseCurrency,
  quoteCurrency,
}: CurrencyRatePairRequest) => {
  const params = genQueryString({
    from_symbol: baseCurrency,
    to_symbol: quoteCurrency,
    function: 'FX_DAILY',
    apikey,
    outputsize: 'compact',
  });

  return await api.get<DailyCurrencyRateResponse>(`${url}?${params}`);
};

export const getMonthlyCurrencyRatePair = async ({
  baseCurrency,
  quoteCurrency,
}: CurrencyRatePairRequest) => {
  const params = genQueryString({
    from_symbol: baseCurrency,
    to_symbol: quoteCurrency,
    function: 'FX_MONTHLY',
    apikey,
    outputsize: 'full',
  });

  return await api.get<MonthlyCurrencyRateResponse>(`${url}?${params}`);
};

export const testApi = async () => {
  const url = 'https://api.exchangerate.host/convert?from=USD&to=EUR';

  return await api.get<MonthlyCurrencyRateResponse>(url);
};
