import _ from 'lodash';

import {
  CurrencyRatePairRequest,
  CurrentCurrencyRatePairResponse,
  DailyCurrencyRateResponse,
  MonthlyCurrencyRateResponse,
} from '@interfaces/api/ICurrenctyRateApi';
import { API_KEYS } from '@utils/axios';
import keysBuilder from '@utils/reactQuery/keysBuilder';
import useFetch from '@utils/reactQuery/useFetch';

const baseKey = 'currencyRate';

const keys = keysBuilder(
  {
    currentCurrencyRatePair: (baseCurrency: string, quoteCurrency: string) => [
      baseCurrency,
      quoteCurrency,
    ],
    dailyCurrencyRatePair: (baseCurrency: string, quoteCurrency: string) => [
      'daily',
      baseCurrency,
      quoteCurrency,
    ],
    montlyCurrencyRatePair: (baseCurrency: string, quoteCurrency: string) => [
      'monthly',
      baseCurrency,
      quoteCurrency,
    ],
  },
  baseKey,
);

export default keys;

export const useCurrentCurrencyRatePairQuery = ({
  baseCurrency,
  quoteCurrency,
}: CurrencyRatePairRequest) =>
  useFetch<CurrentCurrencyRatePairResponse>({
    url: `/`,
    key: keys.currentCurrencyRatePair(baseCurrency, quoteCurrency),
    params: {
      from_currency: baseCurrency,
      to_currency: quoteCurrency,
      function: 'CURRENCY_EXCHANGE_RATE',
    },
  });

export const useDailyCurrencyRatePairQuery = ({
  baseCurrency,
  quoteCurrency,
}: CurrencyRatePairRequest) =>
  useFetch<DailyCurrencyRateResponse>({
    url: `/`,
    key: keys.dailyCurrencyRatePair(baseCurrency, quoteCurrency),
    params: {
      from_symbol: baseCurrency,
      to_symbol: quoteCurrency,
      function: 'FX_DAILY',
      outputsize: 'full',
      apikey: _.sample(API_KEYS),
    },
  });

export const useMonthlyCurrencyRatePairQuery = ({
  baseCurrency,
  quoteCurrency,
}: CurrencyRatePairRequest) =>
  useFetch<MonthlyCurrencyRateResponse>({
    url: `/`,
    key: keys.montlyCurrencyRatePair(baseCurrency, quoteCurrency),
    params: {
      from_symbol: baseCurrency,
      to_symbol: quoteCurrency,
      function: 'FX_MONTHLY',
      outputsize: 'full',
    },
  });
