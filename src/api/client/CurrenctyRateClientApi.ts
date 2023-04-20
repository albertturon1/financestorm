'use client';

import { useQuery } from '@tanstack/react-query';

import {
  getDailyCurrencyTimeseriesOneYearQuery,
  getTodayCurrencyRatesQuery,
} from '../CurrenctyRateApi';
import {
  DailyCurrencyRatesTimeseriesRequest,
  MultiCurrenciesRate,
} from '../interfaces/ICurrenctyRateApi';

export const useGetTodayCurrencyRatesQuery = (props: MultiCurrenciesRate) =>
  useQuery(
    ['todayCurrencyRates', props],
    () => getTodayCurrencyRatesQuery(props),
    { enabled: !!props.base_currencies.length && !!props.base_currencies },
  );

export const useGetDailyCurrencyTimeseriesOneYearQuery = (
  props: DailyCurrencyRatesTimeseriesRequest,
) =>
  useQuery(
    ['todayCurrencyRates', props],
    () => getDailyCurrencyTimeseriesOneYearQuery(props),
    { enabled: !!props.base_currencies.length && !!props.base_currencies },
  );
