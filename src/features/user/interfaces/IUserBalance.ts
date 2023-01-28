import { Currencies } from '@interfaces/ICurrency';

export interface UserCurrencyBalance {
  currency: string;
  value: number;
  percentage: number;
  current_currency_value: number;
}

export interface UserBalanceChart {
  data: UserCurrencyBalance[];
  quote_currency: Currencies;
}

export interface UserBalanceData {
  balance: number;
  currencies: UserCurrencyBalance[];
}
