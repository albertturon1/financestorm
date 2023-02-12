'use client';

import { useCallback, useEffect, useState } from 'react';

import CheckboxList from '@components/CheckboxList';
import { CURRENCIES } from '@constants/currencies';
import {
  useBaseCurrencies,
  useQuoteCurrency,
  useMultiCurrenciesActions,
} from '@src/zustand/multiCurrenciesStore';

import currenciesWithIndex, {
  IndexCurrency,
} from '../tools/currenciesWithIndex';

const BaseCurrenciesCheckboxList = () => {
  const [availableBaseCurrencies, setAvailableBaseCurrencies] = useState<
    IndexCurrency[]
  >([]);
  const baseCurrencies = useBaseCurrencies();
  const quoteCurrency = useQuoteCurrency();
  const { setBaseCurrencies } = useMultiCurrenciesActions();

  useEffect(() => {
    const baseCurrenciesNames = baseCurrencies.map((c) => c.name);
    const nonQuoteCurreciesList = currenciesWithIndex(
      CURRENCIES.filter(
        (name) =>
          name !== quoteCurrency?.name && !baseCurrenciesNames.includes(name),
      ),
    );
    setAvailableBaseCurrencies([...baseCurrencies, ...nonQuoteCurreciesList]);
  }, [availableBaseCurrencies.length, baseCurrencies, quoteCurrency?.name]);

  const onBoxClick = useCallback(
    (v: IndexCurrency) => {
      const filtered = baseCurrencies.filter((c) => c.id !== v.id);

      if (filtered.length < baseCurrencies.length) {
        setBaseCurrencies(filtered);
      } else {
        setBaseCurrencies(baseCurrencies.concat(v));
      }
    },
    [baseCurrencies, setBaseCurrencies],
  );

  return (
    <CheckboxList
      title="Waluty bazowe"
      items={availableBaseCurrencies}
      activeItems={baseCurrencies}
      nameExtractor={(currency) => currency.name}
      keyExtractor={(currency) => currency.id}
      onBoxClick={onBoxClick}
    />
  );
};

export default BaseCurrenciesCheckboxList;
