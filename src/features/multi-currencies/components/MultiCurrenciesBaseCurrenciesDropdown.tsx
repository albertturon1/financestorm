'use client';

import { memo, useCallback, useEffect, useState } from 'react';

import CustomDropdownList from '@components/customDropdownList';
import { CustomDropdownListRenderItem } from '@components/customDropdownList/CustomDropdownList';
import { CURRENCIES } from '@constants/Currencies';
import { includedInGenericArray } from '@utils/misc';

import MultiCurrenciesDropdownCurrenciesItem from './MultiCurrenciesDropdownCurrenciesItem';
import currenciesWithIndex, {
  IndexCurrency,
} from '../tools/currenciesWithIndex';

const MultiCurrenciesBaseCurrenciesDropdown = ({
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

  const renderItem = useCallback(
    (props: CustomDropdownListRenderItem<IndexCurrency>) => (
      <MultiCurrenciesDropdownCurrenciesItem
        onClick={() => {
          onClick(props.item);
        }}
        checked={includedInGenericArray(baseCurrencies, props.item)}
        {...props}
      />
    ),
    [baseCurrencies, onClick],
  );

  return (
    <CustomDropdownList
      title={
        baseCurrrenciesLength
          ? `Waluty bazowe (${baseCurrrenciesLength})`
          : 'Waluty bazowe'
      }
      items={availableBaseCurrencies}
      activeItems={baseCurrencies}
      nameExtractor={(currency) => currency.name}
      keyExtractor={(currency) => `${currency.id}_${currency.name}`}
      renderItem={renderItem}
    />
  );
};

const Memo = memo(MultiCurrenciesBaseCurrenciesDropdown);
export default Memo;
