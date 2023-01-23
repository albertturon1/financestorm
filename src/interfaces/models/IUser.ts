import { Currencies } from '@interfaces/ICurrency';

export interface User {
  id: string;
  created: Date;
  updated: Date;
  name: string;
  email: string;
  current_currency: Currencies;
  currencies: UserCurrency[];
  verified?: boolean;
  avatar?: string;
  photo?: string;
}

export interface UserCurrency {
  amount: number;
  account_id: string;
  currency: Currencies;
}
