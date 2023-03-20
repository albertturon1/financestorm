'use client';

import { useCallback } from 'react';

import {
  useMultiCurrenciesBaseCurrencies,
  useMultiCurrenciesActions,
  useMultiCurrenciesQuoteCurrency,
} from '@src/zustand/multiCurrenciesStore';

import MultiCurrenciesBaseCurrenciesDropdown from './MultiCurrenciesBaseCurrenciesDropdown';
import MultiCurrenciesQuoteCurrencyDropdown from './MultiCurrenciesQuoteCurrencyDropdown';
import { IndexCurrency } from '../tools/currenciesWithIndex';

const MultiCurrenciesDropdowns = () => {
  const baseCurrencies = useMultiCurrenciesBaseCurrencies();
  const quoteCurrency = useMultiCurrenciesQuoteCurrency();
  const { setMultiCurrenciesBaseCurrencies, setMultiCurrenciesQuoteCurrency } =
    useMultiCurrenciesActions();

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
    [
      baseCurrencies,
      setMultiCurrenciesBaseCurrencies,
      setMultiCurrenciesQuoteCurrency,
    ],
  );

  return (
    <div className="flex flex-col gap-x-6 gap-y-3 md:flex-row">
      <MultiCurrenciesBaseCurrenciesDropdown
        onClick={onBaseCurrenciesCheckboxListClick}
        quoteCurrency={quoteCurrency}
        baseCurrencies={baseCurrencies}
      />
      <MultiCurrenciesQuoteCurrencyDropdown
        onClick={onQuoteCurrencyCheckboxListClick}
        quoteCurrency={quoteCurrency}
      />
    </div>
  );
};

export default MultiCurrenciesDropdowns;
