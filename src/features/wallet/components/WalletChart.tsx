'use client';

import { DateTime } from 'luxon';
import {
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Brush,
  AreaChart,
  Legend,
  TooltipProps,
} from 'recharts';

import DataLoader, { DataLoaderQueryProps } from '@components/ui/DataLoader';
import { CHART_X_AXIS_TICK_FORMATTER_OPTIONS } from '@constants/chart';
import { inflationSumPerMonth } from '@features/walletHistory/tools/inflationWalletOverTimeValue';
import useWindowSize from '@hooks/useWindowSize';
import { DateValue } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import {
  ExchangeRateTimeseriesRatesArray,
  ExchangeRateTimeseriesResponse,
} from '@interfaces/models/IExchangerate';
import { OECDResponse } from '@src/api/interfaces/IOECDApi';
import Theme from '@src/Theme';
import { WalletCurrency } from '@src/zustand/walletStore';
import { yAxisDomainFormatter } from '@utils/chartHelpers';
import { convertDailyCurrencyRatesToArray } from '@utils/currencyRateApiHelpers';
import { cutNumber, substituePotentialNaNToZero } from '@utils/misc';
import normalizeOECDData from '@utils/normalizeOECDData';

import WalletChartTooltip from './WalletChartTooltip';

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

function calculateValuesForDays({
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
          (c) =>
            // console.log('c.name: ', c.name);
            c.name === (currency.toLowerCase() as Currency), //currency is uppercase
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
    ? inflationSumPerMonth(monthlyCPIValues)
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

const WalletChart = ({
  dailyCurrencyRatesOverYearQuery,
  monthlyCPIQuery,
  ...props
}: {
  walletBaseCurrencies: WalletCurrency[];
  walletQuoteCurrency: WalletCurrency;
  dailyCurrencyRatesOverYearQuery: DataLoaderQueryProps<
    ExchangeRateTimeseriesResponse | undefined
  >;
  monthlyCPIQuery: DataLoaderQueryProps<OECDResponse | undefined>;
}) => {
  const { screenWidth } = useWindowSize();

  //data loader makes sense when data is being refetch on client - best thing you can do is to handle errors and show fallback when loading --- dont forget to set ssr: false
  return (
    <DataLoader
      isLoading={
        dailyCurrencyRatesOverYearQuery.isLoading && monthlyCPIQuery.isLoading
      }
      isFetching={
        dailyCurrencyRatesOverYearQuery.isFetching && monthlyCPIQuery.isFetching
      }
      data={dailyCurrencyRatesOverYearQuery.data}
    >
      {(dailyCurrencyRatesOverYear) => {
        const dailyCurrencyRatesArray = convertDailyCurrencyRatesToArray(
          dailyCurrencyRatesOverYear.rates,
          props.walletQuoteCurrency.name,
        );
        const monthlyCPIValues = normalizeOECDData(monthlyCPIQuery.data);
        const chartRates = calculateValuesForDays({
          ratesArray: dailyCurrencyRatesArray,
          monthlyCPIValues,
          ...props,
        });

        return (
          <div className="flex flex-col gap-y-10">
            <div className="h-[40vh] w-full">
              <ResponsiveContainer width={'100%'} height={'100%'}>
                <AreaChart data={chartRates} margin={{ top: 20 }}>
                  <XAxis
                    tickMargin={10}
                    tick={{ fontSize: 15, letterSpacing: -0.5 }}
                    height={50}
                    dataKey="date"
                    allowDuplicatedCategory={false}
                    tickFormatter={(tick: string) =>
                      new Date(tick).toLocaleDateString(
                        'en-US',
                        CHART_X_AXIS_TICK_FORMATTER_OPTIONS,
                      )
                    }
                  />
                  <Legend verticalAlign="top" height={36} />
                  <YAxis
                    domain={yAxisDomainFormatter}
                    tickCount={5}
                    mirror
                    tick={{ fill: Theme.colors.primaryBlack, dy: -11 }}
                  />
                  <CartesianGrid vertical={false} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={Theme.colors.slate}
                    fill={Theme.colors.slate}
                  />
                  <Area
                    type="monotone"
                    dataKey="valueAfterInflation"
                    stroke={Theme.colors.navy}
                    fill={Theme.colors.navy}
                  />
                  <Brush
                    dataKey="date"
                    height={40}
                    stroke={Theme.colors.dark_navy}
                    travellerWidth={screenWidth < 768 ? 20 : 15} //easier to handle on mobile when value is higher
                  />
                  {/* <Tooltip /> */}
                  <Tooltip
                    content={(tooltipProps: TooltipProps<number, string>) => (
                      <WalletChartTooltip {...tooltipProps} />
                    )}
                    cursor={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      }}
    </DataLoader>
  );
};

export default WalletChart;
