'use client';

import { useEffect, useRef, useState } from 'react';

import useLocalStorage from '@hooks/useLocalStorage';

import currenciesWithIndex, {
  IndexCurrency,
} from '../tools/currenciesWithIndex';

const defaultBaseCurrencies = currenciesWithIndex(['USD', 'GBP', 'EUR', 'CHF']);
const defaultQuoteCurrency = currenciesWithIndex(['PLN']);

const useHomePageCurrencies = () => {
  const [baseCurrenciesStorage, setStorageBaseCurrencies] =
    useLocalStorage<IndexCurrency[]>('base_currencies');
  const [quoteCurrencyStorage, setStorageQuoteCurrency] =
    useLocalStorage<IndexCurrency>('quote_currency');

  const [baseCurrencies, setBaseCurrencies] = useState<IndexCurrency[] | null>(
    null,
  );
  const [quoteCurrency, setQuoteCurrency] = useState<IndexCurrency | null>(
    null,
  );

  const baseCurrenciesStorageRef = useRef(baseCurrenciesStorage);
  const quoteCurrencyStorageRef = useRef(quoteCurrency);

  useEffect(() => {
    if (!baseCurrenciesStorageRef?.current) {
      setBaseCurrencies(defaultBaseCurrencies);
      setStorageBaseCurrencies(defaultBaseCurrencies);
    } else setBaseCurrencies(baseCurrenciesStorageRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!quoteCurrencyStorageRef?.current) {
      setQuoteCurrency(defaultQuoteCurrency[0]);
    } else setQuoteCurrency(quoteCurrencyStorageRef.current);
  }, [quoteCurrencyStorageRef]);

  useEffect(() => {
    if (quoteCurrency && quoteCurrencyStorage)
      setStorageQuoteCurrency(quoteCurrency);
  }, [quoteCurrency, quoteCurrencyStorage, setStorageQuoteCurrency]);

  return {
    baseCurrencies,
    quoteCurrency,
    setBaseCurrencies,
    setQuoteCurrency,
    setStorageBaseCurrencies,
    setStorageQuoteCurrency,
  };
};

export default useHomePageCurrencies;
