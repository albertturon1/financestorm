import { Currencies } from '@interfaces/ICurrency';

export interface UserCurrencyBalance {
  currency: string;
  value: number;
  percentage: number;
  amount: number;
}

export interface UserBalanceChart {
  data: UserCurrencyBalance[];
  quote_currency: Currencies;
}

export interface UserBalanceData {
  balance: number;
  currencies: UserCurrencyBalance[];
}
