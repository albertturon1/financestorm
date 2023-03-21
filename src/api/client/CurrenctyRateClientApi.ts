'use client';

import { useQuery } from '@tanstack/react-query';

import { getTodayCurrencyRatesQuery } from '../CurrenctyRateApi';
import { MultiCurrenciesRate } from '../interfaces/ICurrenctyRateApi';

export const useGetTodayCurrencyRatesQuery = (props: MultiCurrenciesRate) =>
  useQuery(
    ['todayCurrencyRates', props],
    () => getTodayCurrencyRatesQuery(props),
    { enabled: !!props.base_currencies.length && !!props.base_currencies },
  );
