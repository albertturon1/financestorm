import { Currencies, CurrenciesWithPLN } from '@interfaces/ICurrency';

export interface CurrencyRatePairRequest {
  baseCurrency: CurrenciesWithPLN;
  quoteCurrency: CurrenciesWithPLN;
}

export interface DailyCurrencyTimeseriesRequest {
  base: Currencies;
  symbols?: Currencies[];
  start_date: string;
  end_date: string;
}
