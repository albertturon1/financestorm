'use client';

import { useCallback, useMemo } from 'react';

import CheckboxList from '@components/CheckboxList';
import { CURRENCIES } from '@constants/currencies';

import useHomePageCurrencies from '../hooks/useHomePageCurrencies';
import currenciesWithIndex, {
  IndexCurrency,
} from '../tools/currenciesWithIndex';

const BaseCurrenciesCheckboxList = () => {
  const {
    baseCurrencies,
    quoteCurrency,
    setBaseCurrencies,
    setStorageBaseCurrencies,
  } = useHomePageCurrencies();
  const availableBaseCurrencies = useMemo(
    () =>
      currenciesWithIndex(CURRENCIES.filter((c) => c !== quoteCurrency?.name)),
    [quoteCurrency],
  );

  const onBoxClick = useCallback(
    (v: IndexCurrency) => {
      if (!baseCurrencies) return;
      const filtered = baseCurrencies.filter((c) => c.id !== v.id);

      if (filtered.length < baseCurrencies.length) {
        console.log('filtered: ', filtered);
        setBaseCurrencies(filtered);
        setStorageBaseCurrencies(filtered);
      } else {
        const d = baseCurrencies.concat(v);
        console.log('d: ', d);
        setBaseCurrencies(d);
        setStorageBaseCurrencies(d);
      }
    },
    [baseCurrencies, setBaseCurrencies, setStorageBaseCurrencies],
  );

  if (!baseCurrencies) return null;
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
