'use client';

import { memo, useEffect, useState } from 'react';

import CheckboxList from '@components/CheckboxList';
import { CURRENCIES } from '@constants/Currencies';
import { includedInGenericArray } from '@utils/misc';

import CurrenciesCheckboxItem from './CurrenciesCheckboxItem';
import currenciesWithIndex, {
  IndexCurrency,
} from '../tools/currenciesWithIndex';

const BaseCurrenciesCheckboxList = ({
  baseCurrencies,
  quoteCurrency,
  onClick,
}: {
  quoteCurrency: IndexCurrency;
  baseCurrencies: IndexCurrency[];
  onClick: (value: IndexCurrency) => void;
}) => {
  const [availableBaseCurrencies, setAvailableBaseCurrencies] = useState<
    IndexCurrency[]
  >([]);
  const [baseCurrrenciesLength, setBaseCurrrenciesLength] = useState<
    number | null
  >(null);
  const baseCurrenciesNames = baseCurrencies.map((c) => c.name);

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
      keyExtractor={(currency) => `${currency.id}_${currency.name}`}
      renderItem={(props) => (
        <CurrenciesCheckboxItem
          onClick={onClick}
          checked={includedInGenericArray(baseCurrencies, props.item)}
          {...props}
        />
      )}
    />
  );
};

const Memo = memo(BaseCurrenciesCheckboxList);
export default Memo;
