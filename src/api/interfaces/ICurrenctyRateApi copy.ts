import { Currencies } from '@interfaces/ICurrency';

export interface CurrencyRatePairRequest {
  baseCurrency: Currencies;
  quoteCurrency: Currencies;
}
