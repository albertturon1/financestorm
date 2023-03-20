'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import CustomDropdownList from '@components/customDropdownList';
import { CustomDropdownListRenderItemProps } from '@components/customDropdownList/CustomDropdownList';
import { CURRENCIES } from '@constants/Currencies';
import { includedInGenericArray } from '@utils/misc';

import MultiCurrenciesDropdownCurrenciesItem from './MultiCurrenciesDropdownCurrenciesItem';
import currenciesWithIndex, {
  IndexCurrency,
} from '../tools/currenciesWithIndex';

const nameExtractor = (currency: IndexCurrency) => currency.name;
const keyExtractor = (currency: IndexCurrency) => currency.id;

const MultiCurrenciesQuoteCurrencyDropdown = ({
  quoteCurrency,
  onClick,
}: {
  quoteCurrency: IndexCurrency;
  onClick: (value: IndexCurrency) => void;
}) => {
  const [availableQuoteCurrencies, setAvailableQuoteCurrencies] = useState<
    IndexCurrency[]
  >([]);

  useEffect(() => {
    const sortedCurrencies = currenciesWithIndex(CURRENCIES).sort((a) =>
      a.id === quoteCurrency.id ? -1 : 1,
    );
    setAvailableQuoteCurrencies(sortedCurrencies);
  }, [quoteCurrency.id]);

  const activeItems = useMemo(
    () => [availableQuoteCurrencies[0]],
    [availableQuoteCurrencies],
  );

  const renderItem = useCallback(
    (props: CustomDropdownListRenderItemProps<IndexCurrency>) => (
      <MultiCurrenciesDropdownCurrenciesItem
        type="radio"
        onClick={() => {
          onClick(props.item);
        }}
        checked={includedInGenericArray(activeItems, props.item)}
        {...props}
      />
    ),
    [activeItems, onClick],
  );

  if (!availableQuoteCurrencies.length) return null;
  return (
    <CustomDropdownList
      items={availableQuoteCurrencies}
      title={`Waluta kwotowana ${availableQuoteCurrencies[0].name}`}
      activeItems={activeItems}
      nameExtractor={nameExtractor}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      containerClassName="w-full lg:w-64"
    />
  );
};

const Memo = memo(MultiCurrenciesQuoteCurrencyDropdown);
export default Memo;
