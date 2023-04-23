import {
  DailyCurrencyRatesTimeseriesRequest,
  MultiCurrenciesRate,
} from '../interfaces/ICurrenctyRateApi';

export const CURRENCY_RATE_KEYS = {
  all: ['CURRENCY_RATE_KEYS'] as const,
  dailyCurrencyTimeseriesOneYear: (
    props: DailyCurrencyRatesTimeseriesRequest,
  ) =>
    [
      ...CURRENCY_RATE_KEYS.all,
      'dailyCurrencyTimeseriesOneYear',
      props,
    ] as const,
  todayCurrencyRates: (props: MultiCurrenciesRate) =>
    [...CURRENCY_RATE_KEYS.all, 'todayCurrencyRates', props] as const,
};
