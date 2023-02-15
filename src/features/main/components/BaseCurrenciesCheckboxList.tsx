'use client';

import { memo, useCallback, useEffect, useState } from 'react';

import CheckboxList from '@components/CheckboxList';
import { CURRENCIES } from '@constants/currencies';
import {
  useBaseCurrencies,
  useQuoteCurrency,
  useMultiCurrenciesActions,
  useBaseCurrenciesNames,
} from '@src/zustand/multiCurrenciesStore';
import { includedInGenericArray } from '@utils/misc';

import CurrenciesCheckboxItem from './CurrenciesCheckboxItem';
import currenciesWithIndex, {
  IndexCurrency,
} from '../tools/currenciesWithIndex';

const BaseCurrenciesCheckboxList = () => {
  const [availableBaseCurrencies, setAvailableBaseCurrencies] = useState<
    IndexCurrency[]
  >([]);
  const [baseCurrrenciesLength, setBaseCurrrenciesLength] = useState<
    number | null
  >(null);
  const baseCurrencies = useBaseCurrencies();
  const baseCurrenciesNames = useBaseCurrenciesNames();
  const quoteCurrency = useQuoteCurrency();
  const { setBaseCurrencies } = useMultiCurrenciesActions();

  useEffect(() => {
    setBaseCurrrenciesLength(baseCurrencies.length);
  }, [baseCurrencies.length]);

  useEffect(() => {
    const nonQuoteCurreciesList = currenciesWithIndex(
      CURRENCIES.filter(
        (name) =>
          name !== quoteCurrency?.name && !baseCurrenciesNames.includes(name),
      ),
    );
    setAvailableBaseCurrencies(baseCurrencies.concat(nonQuoteCurreciesList));
  }, [baseCurrencies, baseCurrenciesNames, quoteCurrency?.name]);

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
      title={
        baseCurrrenciesLength
          ? `Waluty bazowe (${baseCurrrenciesLength})`
          : 'Waluty bazowe'
      }
      items={availableBaseCurrencies}
      activeItems={baseCurrencies}
      nameExtractor={(currency) => currency.name}
      keyExtractor={(currency) => currency.id}
      renderItem={(props) => (
        <CurrenciesCheckboxItem
          onClick={onBoxClick}
          checked={includedInGenericArray(baseCurrencies, props.item)}
          {...props}
        />
      )}
    />
  );
};

const Memo = memo(BaseCurrenciesCheckboxList);
export default Memo;
