import { CurrenciesWithPLN } from '@interfaces/ICurrency';

export interface CurrencyRatePairRequest {
  baseCurrency: CurrenciesWithPLN;
  quoteCurrency: CurrenciesWithPLN;
}