import { IndexCurrency } from '@features/main/tools/currenciesWithIndex';
import keysBuilder from '@utils/reactQuery/keysBuilder';
import useFetch from '@utils/reactQuery/useFetch';

const keys = keysBuilder(
  {
    multiBaseCurencies: (
      base_currencies: IndexCurrency[],
      quote_currency: IndexCurrency,
    ) => [base_currencies, quote_currency],
  },
  'currencyRate',
);

export const useMultiBaseCurenciesQuery = useFetch({});
