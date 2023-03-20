'use client';

import { useCallback } from 'react';

import QuoteCurrencyDropdown from '@features/currenciesDropdowns/components/QuoteCurrencyDropdown';
import { IndexCurrency } from '@features/multi-currencies/tools/currenciesWithIndex';
import {
  useTodayCurrencyRatesActions,
  useTodayRatesQuoteCurrency,
} from '@src/zustand/todayCurrencyRatesStore';


const TodayRatesQuoteCurrencyPicker = () => {
  const quoteCurrency = useTodayRatesQuoteCurrency();
  const { setTodayRatesQuoteCurrency } = useTodayCurrencyRatesActions();

  const onQuoteCurrencyCustomDropdownListClick = useCallback(
    (v: IndexCurrency) => {
      setTodayRatesQuoteCurrency(v);
    },
    [setTodayRatesQuoteCurrency],
  );

  return (
    <div className="flex">
      <QuoteCurrencyDropdown
        onClick={onQuoteCurrencyCustomDropdownListClick}
        quoteCurrency={quoteCurrency}
      />
    </div>
  );
};

export default TodayRatesQuoteCurrencyPicker;
