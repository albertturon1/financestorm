/* eslint-disable @typescript-eslint/no-unused-vars */
import { DateTime } from 'luxon';

import { SERVER_DATE } from '@constants/dateTime';
import userCurrenciesAmount from '@features/user/tools/userCurrenciesAmount';
import { WalletDay } from '@interfaces/ICharts';
import { UserCurrency } from '@interfaces/models/IUser';
import { CurrencyRatePair } from '@src/api/interfaces/ICurrencyRateApi';

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

const walletValueOverTime = ({
  currencies,
  quote_currency,
  end_date,
  years,
}: WalletValueOverTimeProps) => {
  // const nonQuoteCurrencies = currencies
  //   ?.filter((b) => b.currency !== quote_currency)
  //   .map((b) => b.currency);
  // const startDate = DateTime.now()
  //   .minus({
  //     years,
  //     days: -1,
  //   })
  //   .toFormat(SERVER_DATE);
  // const endDate = DateTime.fromJSDate(
  //   end_date ? new Date(end_date) : new Date(),
  // ).toFormat(SERVER_DATE);
  // const currencyAmounts = userCurrenciesAmount(currencies);
  // const minValue = -1;
  // const maxValue = -1;
  // const values = currencyRates?.rates_array.reduce((acc, day) => {
  //   let dayValue = currencyAmounts[quote_currency];
  //   const baseCurrencies: WalletBaseCurrencyValue[] = Object.entries(
  //     day.rates,
  //   ).map(([currency, rate]) => {
  //     const value = cutNumber(rate * currencyAmounts[currency as Currency]);
  //     dayValue = cutNumber(dayValue + value);
  //     return {
  //       currency: currency as Currency,
  //       amount: currencyAmounts[currency as Currency],
  //       value,
  //       rate,
  //     };
  //   });
  //   if (minValue === -1 || dayValue < minValue) minValue = dayValue;
  //   if (maxValue === -1 || dayValue > maxValue) maxValue = dayValue;
  //   acc.push({
  //     date: day.date,
  //     baseCurrencies,
  //     quoteCurrency: {
  //       currency: quote_currency,
  //       value: currencyAmounts[quote_currency],
  //     },
  //     value: dayValue,
  //   });
  //   return acc;
  // }, [] as WalletDay[]);
  // return {
  //   startDate,
  //   endDate,
  //   minValue,
  //   maxValue,
  //   values,
  // } as WalletValueOverTime;
};
export default walletValueOverTime;
