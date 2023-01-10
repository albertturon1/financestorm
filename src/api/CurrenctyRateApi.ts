import {
  CurrencyRatePairRequest,
  CurrentCurrencyRatePairResponse,
  DailyCurrencyRateResponse,
} from '@interfaces/api/ICurrenctyRateApi';
import keysBuilder from '@utils/reactQuery/keysBuilder';
import useFetch from '@utils/reactQuery/useFetch';

//3Z8LLAPQXEMXG5V9
const baseKey = 'currencyRate';

const keys = keysBuilder(
  {
    currentCurrencyRatePair: (baseCurrency: string, quoteCurrency: string) => [
      baseCurrency,
      quoteCurrency,
    ],
    dailyCurrencyRatePair: (baseCurrency: string, quoteCurrency: string) => [
      baseCurrency,
      quoteCurrency,
    ],
  },
  baseKey,
);

export default keys;

const staleTime = 600000;

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
    config: { staleTime }, //10min
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
    },
    config: { staleTime },
  });
