import { CURRENCIES } from '@constants/currencies';
import { Currencies } from '@interfaces/ICurrency';
import { User } from '@interfaces/models/IUser';
import { getTodayCurrencyRatesQuery } from '@src/api/CurrenctyRateApi';
import { cutNumber } from '@utils/misc';

interface QuoteCurrencyWalletValue {
  currency: Currencies;
  amount: number;
  accountID: string;
}

interface BaseCurrencyWalletValue extends QuoteCurrencyWalletValue {
  rate: number;
  value: number;
}

export const isBaseCurrencyWalletValue = (
  value: QuoteCurrencyWalletValue | BaseCurrencyWalletValue,
): value is BaseCurrencyWalletValue =>
  (value as BaseCurrencyWalletValue).rate !== undefined;

const todayWalletValue = async (user: User) => {
  const baseCurrencies = user.currencies.filter(
    (c) =>
      CURRENCIES.includes(c.currency.toUpperCase()) &&
      c.currency !== user.quote_currency,
  );

  const currencyRatesResponse = await Promise.all(
    baseCurrencies.map(
      async (c) =>
        await getTodayCurrencyRatesQuery({
          base_currency: c.currency,
          quote_currency: user.quote_currency,
        }),
    ),
  );
  const [quoteCurrency] = user.currencies.filter(
    (c) => user.quote_currency === c.currency,
  );

  const currencyRates = currencyRatesResponse.reduce((acc, item) => {
    {
      acc[item.base] = item.rates[user.quote_currency]; //take quote_currency rate
      return acc;
    }
  }, {} as Record<Currencies, number>);

  const baseCurrenciesValues: BaseCurrencyWalletValue[] = baseCurrencies.map(
    (c) => ({
      rate: currencyRates[c.currency],
      currency: c.currency,
      amount: c.amount,
      value: cutNumber(c.amount * currencyRates[c.currency]),
      accountID: c.account_id,
    }),
  );
  const quoteCurrencyWalletValue: QuoteCurrencyWalletValue = {
    currency: quoteCurrency.currency,
    amount: quoteCurrency.amount,
    accountID: quoteCurrency.account_id,
  };

  const currencies = [
    quoteCurrencyWalletValue,
    ...baseCurrenciesValues,
  ] as const;

  const balance =
    quoteCurrency.amount +
    baseCurrencies.reduce((acc, c) => {
      // eslint-disable-next-line no-param-reassign
      acc += c.amount * currencyRates[c.currency];
      return acc;
    }, 0);

  return {
    balance: cutNumber(balance, 3),
    currencyRates,
    currencies,
  };
};
export default todayWalletValue;
