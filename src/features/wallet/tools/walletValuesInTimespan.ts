import { DateTime } from 'luxon';

import { DateValue } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import { ExchangeRateTimeseriesRatesArray } from '@interfaces/models/IExchangerate';
import { WalletCurrency } from '@src/zustand/walletStore';
import { cutNumber, substituePotentialNaNToZero } from '@utils/misc';

import { getInflationStatsPerMonth } from './inflationStatsPerMonth';

type WalletDayCurrency = {
  currency: Currency;
  rate: number;
  amount: number;
  convertedToQuoteAmount: number;
  convertedPercentage: number;
};

type WalletDayRates = {
  baseCurrenciesInfo: Omit<WalletDayCurrency, 'convertedPercentage'>[];
} & DateValue;
type WalletDayRates2 = {
  baseCurrenciesInfo: WalletDayCurrency[];
  valueAfterInflation: number;
  monthCumulativeInflation: number | undefined;
  quoteCurrencyInfo: WalletCurrency;
} & DateValue;

export function calculateWalletValuesInTimespan({
  ratesArray,
  walletQuoteCurrency,
  walletBaseCurrencies,
  monthlyCPIValues,
}: {
  ratesArray: ExchangeRateTimeseriesRatesArray[];
  walletQuoteCurrency: WalletCurrency;
  walletBaseCurrencies: WalletCurrency[];
  monthlyCPIValues: DateValue[] | undefined;
}) {
  const a = ratesArray.map((day) => {
    const dayValueAndBaseCurrenciesValues = Object.entries(day.rates).reduce(
      (acc, [currency, rate]) => {
        const currencyItem = walletBaseCurrencies.find(
          (c) => c.name === (currency.toLowerCase() as Currency), //currency is uppercase
        );
        if (!currencyItem) return acc;
        const convertedToQuoteAmount = cutNumber(currencyItem.amount * rate);
        // eslint-disable-next-line no-param-reassign
        acc.value += convertedToQuoteAmount;
        acc.baseCurrenciesInfo.push({
          amount: currencyItem.amount,
          convertedToQuoteAmount,
          rate,
          currency: currency as Currency,
        });
        return acc;
      },
      {
        value: substituePotentialNaNToZero(walletQuoteCurrency.amount),
        baseCurrenciesInfo: [],
      } as Omit<WalletDayRates, 'date'>,
    );

    return {
      ...day,
      ...dayValueAndBaseCurrenciesValues,
      value: cutNumber(dayValueAndBaseCurrenciesValues.value),
    };
  }) satisfies WalletDayRates[];

  const inflationStats = monthlyCPIValues
    ? getInflationStatsPerMonth(monthlyCPIValues)
    : {};

  return a.map((day) => {
    const dateTime = DateTime.fromISO(day.date).toFormat('yyyy-MM');
    const inflationDayStats = inflationStats[dateTime]; //possibly undefined - inflation data from latest might not be available
    const valueMultiplier =
      inflationDayStats &&
      (100 - inflationDayStats.monthCumulativeInflation) / 100;
    const valueAfterInflation = valueMultiplier
      ? cutNumber(day.value * valueMultiplier)
      : day.value;

    return {
      ...day,
      baseCurrenciesInfo: day.baseCurrenciesInfo.map((b) => ({
        ...b,
        convertedPercentage: cutNumber(
          (b.convertedToQuoteAmount / day.value) * 100,
        ),
      })),
      valueAfterInflation,
      monthCumulativeInflation: inflationDayStats?.monthCumulativeInflation,
      quoteCurrencyInfo: walletQuoteCurrency,
    } satisfies WalletDayRates2;
  });
}

export type WalletValuesInTimespan = ReturnType<
  typeof calculateWalletValuesInTimespan
>;
