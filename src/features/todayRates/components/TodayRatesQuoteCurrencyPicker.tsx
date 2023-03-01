'use client';

import { useCallback } from 'react';

import {
  useTodayCurrencyRatesActions,
  useTodayRatesQuoteCurrency,
} from '@src/zustand/todayCurrencyRatesStore';

import QuoteCurrencyCheckboxList from '../../multi-currencies/components/QuoteCurrencyCheckboxList';
import { IndexCurrency } from '../../multi-currencies/tools/currenciesWithIndex';

const TodayRatesQuoteCurrencyPicker = () => {
  const quoteCurrency = useTodayRatesQuoteCurrency();
  const { setTodayRatesQuoteCurrency } = useTodayCurrencyRatesActions();

  const onQuoteCurrencyCheckboxListClick = useCallback(
    (v: IndexCurrency) => {
      setTodayRatesQuoteCurrency(v);
    },
    [setTodayRatesQuoteCurrency],
  );

  return (
    <div className="flex">
      <QuoteCurrencyCheckboxList
        onClick={onQuoteCurrencyCheckboxListClick}
        quoteCurrency={quoteCurrency}
      />
    </div>
  );
};

export default TodayRatesQuoteCurrencyPicker;
