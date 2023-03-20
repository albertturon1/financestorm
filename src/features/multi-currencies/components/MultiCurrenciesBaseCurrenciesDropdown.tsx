'use client';

import { memo, useCallback, useEffect, useState } from 'react';

import CustomDropdownList from '@components/customDropdownList';
import { CustomDropdownListRenderItemProps } from '@components/customDropdownList/CustomDropdownList';
import { CURRENCIES } from '@constants/Currencies';
import { includedInGenericArray } from '@utils/misc';

import MultiCurrenciesDropdownCurrenciesItem from './MultiCurrenciesDropdownCurrenciesItem';
import currenciesWithIndex, {
  IndexCurrency,
} from '../tools/currenciesWithIndex';

const nameExtractor = (currency: IndexCurrency) => currency.name;
const keyExtractor = (currency: IndexCurrency) =>
  `${currency.id}_${currency.name}`;

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

  //useState to prevent hydration error on render
  const [baseCurrenciesLength, setBaseCurrenciesLength] = useState<
    number | null
  >(null);

  useEffect(() => {
    setBaseCurrenciesLength(baseCurrencies.length);
  }, [baseCurrencies.length]);

  useEffect(() => {
    const baseCurrenciesNames = baseCurrencies.map((c) => c.name);
    const nonQuoteCurreciesList = currenciesWithIndex(
      CURRENCIES.filter(
        (name) =>
          name !== quoteCurrency?.name && !baseCurrenciesNames.includes(name),
      ),
    );
    setAvailableBaseCurrencies(baseCurrencies.concat(nonQuoteCurreciesList));
  }, [baseCurrencies, quoteCurrency?.name]);

  const renderItem = useCallback(
    (props: CustomDropdownListRenderItemProps<IndexCurrency>) => (
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

  if (!baseCurrenciesLength) return null;
  return (
    <CustomDropdownList
      title={`Waluty bazowe (${baseCurrenciesLength})`}
      items={availableBaseCurrencies}
      activeItems={baseCurrencies}
      nameExtractor={nameExtractor}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      containerClassName="w-full lg:w-64"
    />
  );
};

const Memo = memo(MultiCurrenciesBaseCurrenciesDropdown);
export default Memo;
