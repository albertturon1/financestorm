import { Currency } from '@interfaces/ICurrency';

export interface CurrencyRatePairRequest {
  baseCurrency: Currency;
  quoteCurrency: Currency;
}
