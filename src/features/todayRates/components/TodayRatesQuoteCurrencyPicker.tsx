'use client';

import { useCallback } from 'react';

import MultiCurrenciesQuoteCurrencyDropdown from '@features/multi-currencies/components/MultiCurrenciesQuoteCurrencyDropdown';
import {
  useTodayCurrencyRatesActions,
  useTodayRatesQuoteCurrency,
} from '@src/zustand/todayCurrencyRatesStore';

import { IndexCurrency } from '../../multi-currencies/tools/currenciesWithIndex';

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
      <MultiCurrenciesQuoteCurrencyDropdown
        onClick={onQuoteCurrencyCustomDropdownListClick}
        quoteCurrency={quoteCurrency}
      />
    </div>
  );
};

export default TodayRatesQuoteCurrencyPicker;
