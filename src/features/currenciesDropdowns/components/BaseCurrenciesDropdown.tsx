'use client';

import { memo, useCallback } from 'react';

import CustomDropdownList from '@components/customDropdownList';
import { CustomDropdownListRenderItemProps } from '@components/customDropdownList/CustomDropdownList';
import CurrencyDropdownItem from '@features/currenciesDropdowns/components/CurrencyDropdownItem';
import { IndexCurrency } from '@features/multi-currencies/tools/currenciesWithIndex';
import { includedInGenericArray } from '@utils/misc';

import useBaseCurrenciesDropdownData, {
  BaseCurrenciesDataProps,
} from '../hooks/useBaseCurrenciesDropdownData';

const nameExtractor = (currency: IndexCurrency) => currency.name;
const keyExtractor = (currency: IndexCurrency) =>
  `${currency.id}_${currency.name}`;

const BaseCurrenciesDropdown = ({
  baseCurrencies,
  quoteCurrency,
  onClick,
}: {
  onClick: (value: IndexCurrency) => void;
} & BaseCurrenciesDataProps) => {
  const { availableBaseCurrencies, baseCurrenciesLength } =
    useBaseCurrenciesDropdownData({ quoteCurrency, baseCurrencies });

  const renderItem = useCallback(
    (props: CustomDropdownListRenderItemProps<IndexCurrency>) => (
      <CurrencyDropdownItem
        onClick={() => {
          onClick(props.item);
        }}
        {...props}
        checked={includedInGenericArray(baseCurrencies, props.item)}
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

const Memo = memo(BaseCurrenciesDropdown);
export default Memo;
