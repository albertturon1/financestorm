'use client';

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

import { OECDResponse } from '@api/interfaces/IOECDApi';
import DataLoader, { DataLoaderQueryProps } from '@components/ui/DataLoader';
import { CHART_X_AXIS_TICK_FORMATTER_OPTIONS } from '@constants/chart';
import useWindowSize from '@hooks/useWindowSize';
import { Timespan } from '@interfaces/ICharts';
import { ExchangeRateTimeseriesResponse } from '@interfaces/models/IExchangerate';
import Theme from '@src/Theme';
import { WalletCurrency } from '@src/zustand/walletStore';
import { yAxisDomainFormatter } from '@utils/chartHelpers';
import { convertDailyCurrencyRatesToArray } from '@utils/currencyRateApiHelpers';
import normalizeOECDData from '@utils/normalizeOECDData';

import WalletChartLoader from './loaders/WalletChartLoader';
import WalletChartTooltip from './WalletChartTooltip';
import { calculateWalletValuesInTimespan } from '../tools/walletValuesInTimespan';

const WalletChart = ({
  dailyCurrencyRatesOverYearQuery,
  monthlyCPIQuery,
  timespan,
  ...props
}: {
  walletBaseCurrencies: WalletCurrency[];
  walletQuoteCurrency: WalletCurrency;
  dailyCurrencyRatesOverYearQuery: DataLoaderQueryProps<
    ExchangeRateTimeseriesResponse | undefined
  >;
  monthlyCPIQuery: DataLoaderQueryProps<OECDResponse | undefined>;
  timespan: Timespan;
}) => {
  const { screenWidth } = useWindowSize();
  const showBrush = timespan === '1w' || timespan === '1m' || timespan === '1y'; //hiding over 1y due to performance

  //data loader makes sense when data is being refetch on client - best thing you can do is to handle errors and show fallback when loading --- dont forget to set ssr: false
  return (
    <DataLoader
      customLoader={<WalletChartLoader />}
      isInitialLoading={
        dailyCurrencyRatesOverYearQuery.isInitialLoading ||
        monthlyCPIQuery.isInitialLoading
      }
      isFetching={
        dailyCurrencyRatesOverYearQuery.isFetching || monthlyCPIQuery.isFetching
      }
      data={dailyCurrencyRatesOverYearQuery.data}
      error={dailyCurrencyRatesOverYearQuery.error}
    >
      {(dailyCurrencyRatesOverYear) => {
        const dailyCurrencyRatesArray = convertDailyCurrencyRatesToArray(
          dailyCurrencyRatesOverYear.rates,
          props.walletQuoteCurrency.name,
        );
        const monthlyCPIValues =
          monthlyCPIQuery.data && normalizeOECDData(monthlyCPIQuery.data);

        const chartRates = calculateWalletValuesInTimespan({
          ratesArray: dailyCurrencyRatesArray,
          monthlyCPIValues,
          ...props,
        });

        const showInflationChart =
          monthlyCPIValues && timespan !== '1w' && timespan !== '1m'; //hiding due to performance and and because it doesn't make sense to inflation show data under a month (no data)

        return (
          <div className="flex flex-col gap-y-10">
            <div className="h-[40vh] min-h-[400px] w-full">
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
                  {showInflationChart && (
                    // show when inflation data available
                    <Area
                      type="monotone"
                      dataKey="valueAfterInflation"
                      stroke={Theme.colors.navy}
                      fill={Theme.colors.navy}
                    />
                  )}
                  {showBrush && (
                    <Brush
                      dataKey="date"
                      height={40}
                      stroke={Theme.colors.dark_navy}
                      travellerWidth={screenWidth < 768 ? 20 : 15} //easier to handle on mobile when value is higher
                    />
                  )}
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
