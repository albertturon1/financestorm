// import { WalletBaseCurrencyValue, WalletDay } from '@interfaces/ICharts';
// import { Currency } from '@interfaces/ICurrency';
// import { ExchangeRateTimeseriesResponseRates } from '@interfaces/models/IExchangerate';
// import { UserCurrency } from '@interfaces/models/IUser';
// import { CurrencyRatePair } from '@src/api/interfaces/ICurrencyRateApi';
// import { WalletCurrency } from '@src/zustand/walletStore';
// import { cutNumber } from '@utils/misc';

// export type WalletValueOverTimeProps = Omit<
//   CurrencyRatePair,
//   'base_currency'
// > & {
//   years?: number;
//   end_date?: string;
//   currencies: UserCurrency[];
// };

// export interface WalletValueOverTime {
//   startDate: string;
//   endDate: string;
//   minValue: number;
//   maxValue: number;
//   values: WalletDay[];
// }

// const walletValueOverTime = ({
//   data,
//   walletQuoteCurrency,
//   walletBaseCurrencies,
// }: {
//   data: ExchangeRateTimeseriesResponseRates;
//   walletQuoteCurrency: WalletCurrency;
//   walletBaseCurrencies: WalletCurrency[];
// }) => {
//   const values = currencyRates?.rates_array.reduce((acc, day) => {
//     let dayValue = currencyAmounts[quote_currency];
//     const baseCurrencies: WalletBaseCurrencyValue[] = Object.entries(
//       day.rates,
//     ).map(([currency, rate]) => {
//       const value = cutNumber(rate * currencyAmounts[currency as Currency]);
//       dayValue = cutNumber(dayValue + value);

//       return {
//         currency: currency as Currency,
//         amount: currencyAmounts[currency as Currency],
//         value,
//         rate,
//       };
//     });

//     if (minValue === -1 || dayValue < minValue) minValue = dayValue;
//     if (maxValue === -1 || dayValue > maxValue) maxValue = dayValue;

//     acc.push({
//       date: day.date,
//       baseCurrencies,
//       quoteCurrency: {
//         currency: quote_currency,
//         value: currencyAmounts[quote_currency],
//       },
//       value: dayValue,
//     });
//     return acc;
//   }, [] as WalletDay[]);

//   return {
//     startDate,
//     endDate,
//     minValue,
//     maxValue,
//     values,
//   } as WalletValueOverTime;
// };
// export default walletValueOverTime;
