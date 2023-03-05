import { DateTime } from 'luxon';

import { SERVER_DATE } from '@constants/DateTime';
import userCurrenciesAmount from '@features/user/tools/userCurrenciesAmount';
import { WalletBaseCurrencyValue, WalletDay } from '@interfaces/ICharts';
import { Currencies } from '@interfaces/ICurrency';
import { UserCurrency } from '@interfaces/models/IUser';
import { CurrencyRatePair } from '@src/api/interfaces/ICurrenctyRateApi';
import dailyCurrencyTimeseriesYears from '@utils/dailyCurrencyTimeseriesYears';
import { cutNumber } from '@utils/misc';

export type WalletValueOverTimeProps = Omit<
  CurrencyRatePair,
  'base_currency'
> & {
  years?: number;
  end_date?: string;
  currencies: UserCurrency[];
};

export interface WalletValueOverTime {
  startDate: string;
  endDate: string;
  minValue: number;
  maxValue: number;
  values: WalletDay[];
}

const walletValueOverTime = async ({
  currencies,
  quote_currency,
  end_date,
  years,
}: WalletValueOverTimeProps) => {
  const nonQuoteCurrencies = currencies
    ?.filter((b) => b.currency !== quote_currency)
    .map((b) => b.currency);

  const startDate = DateTime.now()
    .minus({
      years,
      days: -1,
    })
    .toFormat(SERVER_DATE);

  const endDate = DateTime.fromJSDate(
    end_date ? new Date(end_date) : new Date(),
  ).toFormat(SERVER_DATE);

  const currencyRates = await dailyCurrencyTimeseriesYears({
    quote_currency,
    base_currencies: nonQuoteCurrencies,
    end_date: endDate,
    start_date: startDate,
  });

  const currencyAmounts = userCurrenciesAmount(currencies);
  let minValue = -1;
  let maxValue = -1;

  const values = currencyRates?.rates_array.reduce((acc, day) => {
    let dayValue = currencyAmounts[quote_currency];
    const baseCurrencies: WalletBaseCurrencyValue[] = Object.entries(
      day.rates,
    ).map(([currency, rate]) => {
      const value = cutNumber(rate * currencyAmounts[currency as Currencies]);
      dayValue = cutNumber(dayValue + value);

      return {
        currency: currency as Currencies,
        amount: currencyAmounts[currency as Currencies],
        value,
        rate,
      };
    });

    if (minValue === -1 || dayValue < minValue) minValue = dayValue;
    if (maxValue === -1 || dayValue > maxValue) maxValue = dayValue;

    acc.push({
      label: day.date,
      baseCurrencies,
      quoteCurrency: {
        currency: quote_currency,
        value: currencyAmounts[quote_currency],
      },
      value: dayValue,
    });
    return acc;
  }, [] as WalletDay[]);

  return {
    startDate,
    endDate,
    minValue,
    maxValue,
    values,
  } as WalletValueOverTime;
};
export default walletValueOverTime;
