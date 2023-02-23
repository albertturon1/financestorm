import { Currencies } from '@interfaces/ICurrency';

export interface CurrencyRatePair {
  base_currency: Currencies;
  quote_currency: Currencies;
}
export interface MultiCurrenciesRate {
  base_currencies: readonly Currencies[];
  quote_currency: Currencies;
}
export interface CurrencyRateRange {
  start_date: string;
  end_date: string;
}

export type DailyCurrencyRatesTimeseriesRequest = CurrencyRateRange &
  CurrencyRatePair;
