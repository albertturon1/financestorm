import {
  CurrencyRatePairRequest,
  CurrencyRatePairResponse,
} from '@interfaces/api/ICurrenctyRateApi';
import keysBuilder from '@utils/reactQuery/keysBuilder';
import useFetch from '@utils/reactQuery/useFetch';

//3Z8LLAPQXEMXG5V9
const baseKey = 'currencyRate';

const keys = keysBuilder(
  {
    currencyRatePair: (baseCurrency: string, quoteCurrency: string) => [
      baseCurrency,
      quoteCurrency,
    ],
  },
  baseKey,
);

export default keys;

export const useCurrencyRatePairQuery = ({
  baseCurrency,
  quoteCurrency,
}: CurrencyRatePairRequest) =>
  useFetch<CurrencyRatePairResponse>({
    url: `/`,
    key: keys.currencyRatePair(baseCurrency, quoteCurrency),
    params: {
      from_currency: baseCurrency,
      to_currency: quoteCurrency,
      //apikey: 'HVNKI51T3XL21JI9',
      function: 'CURRENCY_EXCHANGE_RATE',
    },
    config: { staleTime: 60000000 },
  });
