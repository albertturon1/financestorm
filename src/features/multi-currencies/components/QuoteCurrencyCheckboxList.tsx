'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import CheckboxList from '@components/CheckboxList';
import { ChecboxListRenderItem } from '@components/CheckboxList/CheckboxList';
import { CURRENCIES } from '@constants/Currencies';
import { includedInGenericArray } from '@utils/misc';

import CurrenciesCheckboxItem from './CurrenciesCheckboxItem';
import currenciesWithIndex, {
  IndexCurrency,
} from '../tools/currenciesWithIndex';

const nameExtractor = (currency: IndexCurrency) => currency.name;
const keyExtractor = (currency: IndexCurrency) => currency.id;

const QuoteCurrencyCheckboxList = ({
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
    (props: ChecboxListRenderItem<IndexCurrency>) => (
      <CurrenciesCheckboxItem
        onClick={onClick}
        checked={includedInGenericArray(activeItems, props.item)}
        {...props}
      />
    ),
    [activeItems, onClick],
  );

  return (
    <CheckboxList
      title={
        availableQuoteCurrencies.length
          ? `Waluta kwotowana (${availableQuoteCurrencies[0].name})`
          : 'Waluta kwotowana'
      }
      items={availableQuoteCurrencies}
      activeItems={activeItems}
      nameExtractor={nameExtractor}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

const Memo = memo(QuoteCurrencyCheckboxList);
export default Memo;
