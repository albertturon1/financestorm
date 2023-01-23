import { Currencies } from '@interfaces/ICurrency';

export interface CurrencyRatePair {
  base_currency: Currencies;
  quote_currency: Currencies;
}
export interface CurrencyRateDates {
  start_date: string;
  end_date: string;
}

export type DailyCurrencyTimeseriesRequest = CurrencyRateDates &
  CurrencyRatePair;
