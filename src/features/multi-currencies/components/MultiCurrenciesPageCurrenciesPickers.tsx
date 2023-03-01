'use client';

import { useCallback } from 'react';

import {
  useMultiCurrenciesBaseCurrencies,
  useMultiCurrenciesActions,
  useMultiCurrenciesQuoteCurrency,
} from '@src/zustand/multiCurrenciesStore';

import BaseCurrenciesCheckboxList from './BaseCurrenciesCheckboxList';
import QuoteCurrencyCheckboxList from './QuoteCurrencyCheckboxList';
import { IndexCurrency } from '../tools/currenciesWithIndex';

const MultiCurrenciesPageCurrenciesPickers = () => {
  const baseCurrencies = useMultiCurrenciesBaseCurrencies();
  const quoteCurrency = useMultiCurrenciesQuoteCurrency();
  const { setMultiCurrenciesBaseCurrencies, setMultiCurrenciesQuoteCurrency } = useMultiCurrenciesActions();

  const onBaseCurrenciesCheckboxListClick = useCallback(
    (v: IndexCurrency) => {
      const filtered = baseCurrencies.filter((c) => c.id !== v.id);

      if (filtered.length < baseCurrencies.length) {
        setMultiCurrenciesBaseCurrencies(filtered);
      } else {
        setMultiCurrenciesBaseCurrencies(baseCurrencies.concat(v));
      }
    },
    [baseCurrencies, setMultiCurrenciesBaseCurrencies],
  );

  const onQuoteCurrencyCheckboxListClick = useCallback(
    (v: IndexCurrency) => {
      const filtered = baseCurrencies.filter((c) => c.id !== v.id);
      setMultiCurrenciesQuoteCurrency(v);

      if (filtered.length < baseCurrencies.length) {
        setMultiCurrenciesBaseCurrencies(filtered);
      }
    },
    [baseCurrencies, setMultiCurrenciesBaseCurrencies, setMultiCurrenciesQuoteCurrency],
  );

  return (
    <div className="flex gap-x-6">
      <BaseCurrenciesCheckboxList
        onClick={onBaseCurrenciesCheckboxListClick}
        quoteCurrency={quoteCurrency}
        baseCurrencies={baseCurrencies}
      />
      <QuoteCurrencyCheckboxList
        onClick={onQuoteCurrencyCheckboxListClick}
        quoteCurrency={quoteCurrency}
      />
    </div>
  );
};

export default MultiCurrenciesPageCurrenciesPickers;
