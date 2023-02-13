'use client';

import { useCallback, useEffect, useState } from 'react';

import CheckboxList from '@components/CheckboxList';
import { CURRENCIES } from '@constants/currencies';
import {
  useQuoteCurrency,
  useMultiCurrenciesActions,
  useBaseCurrencies,
} from '@src/zustand/multiCurrenciesStore';

import currenciesWithIndex, {
  IndexCurrency,
} from '../tools/currenciesWithIndex';

const QuoteCurrencyCheckboxList = () => {
  const quoteCurrency = useQuoteCurrency();
  const baseCurrencies = useBaseCurrencies();
  const { setQuoteCurrency, setBaseCurrencies } = useMultiCurrenciesActions();
  const [availableQuoteCurrencies, setAvailableQuoteCurrencies] = useState<
    IndexCurrency[]
  >([]);

  useEffect(() => {
    const sortedCurrencies = currenciesWithIndex(CURRENCIES).sort((a) =>
      a.id === quoteCurrency.id ? -1 : 1,
    );
    setAvailableQuoteCurrencies(sortedCurrencies);
  }, [quoteCurrency.id]);

  const onBoxClick = useCallback(
    (v: IndexCurrency) => {
      const filtered = baseCurrencies.filter((c) => c.id !== v.id);
      setQuoteCurrency(v);

      if (filtered.length < baseCurrencies.length) {
        setBaseCurrencies(filtered);
      }
    },
    [baseCurrencies, setBaseCurrencies, setQuoteCurrency],
  );

  return (
    <CheckboxList
      title={
        availableQuoteCurrencies.length
          ? `Waluta kwotowana (${availableQuoteCurrencies[0].name})`
          : 'Waluta kwotowana'
      }
      items={availableQuoteCurrencies}
      activeItems={[availableQuoteCurrencies[0]]}
      nameExtractor={(currency) => currency.name}
      keyExtractor={(currency) => currency.id}
      onBoxClick={onBoxClick}
    />
  );
};

export default QuoteCurrencyCheckboxList;
