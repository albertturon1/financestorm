import { CURRENCIES } from '@constants/Currencies';
import { Currencies } from '@interfaces/ICurrency';
import { UserModel } from '@interfaces/models/IUser';
import { getTodayCurrencyRatesQuery } from '@src/api/CurrenctyRateApi';
import { cutNumber } from '@utils/misc';

export interface QuoteCurrencyWalletValue {
  currency: Currencies;
  amount: number;
  accountID: string;
  percentage: number;
}

export interface BaseCurrencyWalletValue extends QuoteCurrencyWalletValue {
  rate: number;
  value: number;
}

export const isBaseCurrencyWalletValue = (
  value: QuoteCurrencyWalletValue | BaseCurrencyWalletValue,
): value is BaseCurrencyWalletValue =>
  (value as BaseCurrencyWalletValue).rate !== undefined;

const todayWalletValue = async (user: UserModel) => {
  const userBaseCurrencies = user.currencies.filter(
    (c) =>
      CURRENCIES.includes(c.currency.toUpperCase() as Currencies) &&
      c.currency !== user.quote_currency,
  );

  const { rates } = await getTodayCurrencyRatesQuery({
    base_currencies: userBaseCurrencies.map((b) => b.currency),
    quote_currency: user.quote_currency,
  });

  const [quoteCurrency] = user.currencies.filter(
    (c) => user.quote_currency === c.currency,
  );

  const balance =
    quoteCurrency.amount +
    userBaseCurrencies.reduce((acc, c) => {
      // eslint-disable-next-line no-param-reassign
      acc += c.amount * rates[c.currency];
      return acc;
    }, 0);

  const baseCurrenciesValues: BaseCurrencyWalletValue[] =
    userBaseCurrencies.map((c) => {
      const value = cutNumber(c.amount * rates[c.currency]);
      return {
        rate: rates[c.currency],
        currency: c.currency,
        amount: c.amount,
        value,
        accountID: c.account_id,
        percentage: cutNumber((value / balance) * 100, 2),
      };
    });

  const quoteCurrencyWalletValue: QuoteCurrencyWalletValue = {
    currency: quoteCurrency.currency,
    amount: quoteCurrency.amount,
    accountID: quoteCurrency.account_id,
    percentage: cutNumber((quoteCurrency.amount / balance) * 100, 2),
  };

  const currencies = [
    quoteCurrencyWalletValue,
    ...baseCurrenciesValues,
  ] as const;

  return {
    balance: cutNumber(balance, 3),
    rates,
    currencies,
  };
};
export default todayWalletValue;
