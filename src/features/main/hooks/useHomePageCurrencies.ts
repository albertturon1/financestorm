'use client';

import useLocalStorage from '@hooks/useLocalStorage';

import currenciesWithIndex, {
  IndexCurrency,
} from '../tools/currenciesWithIndex';

const defaultBaseCurrencies = currenciesWithIndex(['USD', 'GBP', 'EUR', 'CHF']);
const defaultQuoteCurrency = currenciesWithIndex(['PLN']);

const useHomePageCurrencies = () => {
  //const [baseCurrencies, setBaseCurrencies] = useLocalStorage<IndexCurrency[]>(
  //  'base_currencies',
  //  defaultBaseCurrencies,
  //);
  //const [quoteCurrency, setQuoteCurrency] = useLocalStorage<IndexCurrency>(
  //  'quote_currency',
  //  defaultQuoteCurrency[0],
  //);

  //return {
  //  baseCurrencies,
  //  quoteCurrency,
  //  setBaseCurrencies,
  //  setQuoteCurrency,
  //};
};

export default useHomePageCurrencies;
