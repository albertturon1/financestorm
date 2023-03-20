'use client';

import { memo, useCallback } from 'react';

import CustomDropdownList from '@components/customDropdownList';
import { CustomDropdownListRenderItemProps } from '@components/customDropdownList/CustomDropdownList';
import {
  IndexCurrency,
} from '@features/multi-currencies/tools/currenciesWithIndex';
import { includedInGenericArray } from '@utils/misc';

import CurrencyDropdownItem from './CurrencyDropdownItem';
import useQuoteCurrencyDropdownData from '../hooks/useQuoteCurrencyDropdownData';

const nameExtractor = (currency: IndexCurrency) => currency.name;
const keyExtractor = (currency: IndexCurrency) => currency.id;

const MultiCurrenciesQuoteCurrencyDropdown = ({
  quoteCurrency,
  onClick,
}: {
  quoteCurrency: IndexCurrency;
  onClick: (value: IndexCurrency) => void;
}) => {
  const { availableQuoteCurrencies, activeQuoteCurrency } =
    useQuoteCurrencyDropdownData({ quoteCurrency });

  const renderItem = useCallback(
    (props: CustomDropdownListRenderItemProps<IndexCurrency>) => (
      <CurrencyDropdownItem
        type="radio"
        onClick={() => {
          onClick(props.item);
        }}
        checked={includedInGenericArray(activeQuoteCurrency, props.item)}
        {...props}
      />
    ),
    [activeQuoteCurrency, onClick],
  );

  if (!availableQuoteCurrencies.length) return null;
  return (
    <CustomDropdownList
      items={availableQuoteCurrencies}
      title={`Waluta kwotowana ${availableQuoteCurrencies[0].name}`}
      activeItems={activeQuoteCurrency}
      nameExtractor={nameExtractor}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      containerClassName="w-full lg:w-64"
    />
  );
};

const Memo = memo(MultiCurrenciesQuoteCurrencyDropdown);
export default Memo;
