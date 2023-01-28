import { CURRENCIES } from '@constants/currencies';
import userCurrenciesAmount from '@features/user/tools/userCurrenciesAmount';
import { User } from '@interfaces/models/IUser';
import { getDailyCurrencyTimeseries } from '@src/api/CurrenctyRateApiV2';
import { getNDaysPastServerDate, cutNumber } from '@utils/misc';
import normalizeExchangeRateResponse from '@utils/normalizeExchangeRateResponse';

const today = getNDaysPastServerDate(0);

const todayWalletValue = async (user: User) => {
  const currencyAmounts = userCurrenciesAmount(user.currencies);
  const nonBaseCurrencies = Object.keys(currencyAmounts).filter(
    (key) =>
      CURRENCIES.includes(key.toUpperCase()) && key !== user.quote_currency,
  );

  const currencyRates = await Promise.all(
    nonBaseCurrencies.map(async (currency) => {
      const res = await getDailyCurrencyTimeseries({
        base_currency: currency,
        quote_currency: user.quote_currency,
        end_date: today,
        start_date: today,
      });

      return normalizeExchangeRateResponse({
        currency_rates: res,
        quote_currency: user.quote_currency,
      });
    }),
  );
  const currentCurrency = currencyAmounts[user.quote_currency];

  const balance =
    currentCurrency +
    currencyRates
      .map(
        (currency) => currency.rates[0].value * currencyAmounts[currency.base],
      )
      // eslint-disable-next-line no-param-reassign
      .reduce((acc, value) => (acc += value), 0);

  return {
    balance: cutNumber(balance, 3),
    currencyRates,
  };
};
export default todayWalletValue;
