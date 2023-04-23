import { Currency } from '@interfaces/ICurrency';
import { UserCurrency } from '@interfaces/models/IUser';

const userCurrenciesAmount = (currencies: UserCurrency[]) =>
  currencies.reduce((acc, c) => {
    acc[`${c.currency}`] = c.amount;
    return acc;
  }, {} as Record<Currency, number>);

export default userCurrenciesAmount;
