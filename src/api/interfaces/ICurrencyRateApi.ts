import { PrefetchRequest } from '@interfaces/IApi';
import { Currency } from '@interfaces/ICurrency';

export interface MultiCurrenciesRate {
  base_currencies: Currency[];
  quote_currency: Currency;
}
export interface CurrencyRateRange {
  start_date: string;
  end_date: string;
}

export type DailyCurrencyRatesRequest = CurrencyRateRange & MultiCurrenciesRate;

export type PrefetchTodayCurrencyRatesRequest =
  PrefetchRequest<MultiCurrenciesRate>;

export type PrefetchDailyCurrencyRatesRequest =
  PrefetchRequest<DailyCurrencyRatesRequest>;
