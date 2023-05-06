import {
  DailyCurrencyRatesRequest,
  MultiCurrenciesRate,
} from '../interfaces/ICurrencyRateApi';

export const CURRENCY_RATE_KEYS = {
  all: ['CURRENCY_RATE_KEYS'] as const,
  dailyCurrencyRates: (
    props: DailyCurrencyRatesRequest,
  ) =>
    [
      ...CURRENCY_RATE_KEYS.all,
      'dailyCurrencyRates',
      props,
    ] as const,
  todayCurrencyRates: (props: MultiCurrenciesRate) =>
    [...CURRENCY_RATE_KEYS.all, 'todayCurrencyRates', props] as const,
};
