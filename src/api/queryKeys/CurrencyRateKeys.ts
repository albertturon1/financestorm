import {
  DailyCurrencyRatesTimeseriesRequest,
  MultiCurrenciesRate,
} from '../interfaces/ICurrenctyRateApi';

export const currencyRateKeys = {
  all: ['currencyRateKeys'] as const,
  dailyCurrencyTimeseriesOneYear: (
    props: DailyCurrencyRatesTimeseriesRequest,
  ) =>
    [...currencyRateKeys.all, 'dailyCurrencyTimeseriesOneYear', props] as const,
  todayCurrencyRates: (props: MultiCurrenciesRate) =>
    [...currencyRateKeys.all, 'todayCurrencyRates', props] as const,
};
