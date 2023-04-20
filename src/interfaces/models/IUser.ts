import { Currency } from '@interfaces/ICurrency';

export interface UserModel {
  id: string;
  created: Date;
  updated: Date;
  name: string;
  email: string;
  quote_currency: Currency;
  currencies: UserCurrency[];
  verified?: boolean;
  avatar?: string;
  photo?: string;
}

export interface UserCurrency {
  amount: number;
  account_id: string;
  currency: Currency;
}
