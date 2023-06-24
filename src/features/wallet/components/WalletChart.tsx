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
import WalletChartInflationFetchStatus from './WalletChartInflationFetchStatus';
import WalletChartTooltip from './WalletChartTooltip';
import { calculateWalletValuesInTimespan } from '../tools/walletValuesInTimespan';

export function checkIsOECDFetchEnabledByTimespan(timespan: Timespan) {
  return timespan !== '1w' && timespan !== '1m';
}

const WalletChart = ({
  dailyCurrencyRatesOverYearQuery,
  monthlyCPIQuery,
  timespan,
  showBrush = true,
  ...props
}: {
  walletBaseCurrencies: WalletCurrency[];
  walletQuoteCurrency: WalletCurrency;
  dailyCurrencyRatesOverYearQuery: DataLoaderQueryProps<
    ExchangeRateTimeseriesResponse | undefined
  >;
  monthlyCPIQuery: DataLoaderQueryProps<OECDResponse | undefined>;
  timespan: Timespan;
  showBrush?: boolean;
}) => {
  const { screenWidth } = useWindowSize();

  const isBrushVisible =
    showBrush &&
    (!checkIsOECDFetchEnabledByTimespan(timespan) || timespan === '1y'); //hiding over 1y due to performance

  //data loader makes sense when data is being refetch on client - best thing you can do is to handle errors and show fallback when loading --- dont forget to set ssr: false
  return (
    <DataLoader
      customLoader={<WalletChartLoader />}
      isInitialLoading={dailyCurrencyRatesOverYearQuery.isInitialLoading}
      isFetching={dailyCurrencyRatesOverYearQuery.isFetching}
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
          <div className="flex h-full w-full flex-1 flex-col gap-y-2">
            <WalletChartInflationFetchStatus
              isDataAvailable={!!monthlyCPIValues && !!monthlyCPIValues.length}
              isFetching={
                monthlyCPIQuery.isFetching || monthlyCPIQuery.isInitialLoading
              }
              timespan={timespan}
              quoteCurrency={props.walletQuoteCurrency.name}
            />
            <div className="flex h-full w-full">
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
                  <Legend
                    verticalAlign="top"
                    wrapperStyle={{
                      top: 0,
                    }}
                  />
                  <YAxis
                    domain={yAxisDomainFormatter}
                    tickCount={5}
                    mirror
                    tick={{
                      fill: Theme.colors.dark_navy,
                      dy: -11,
                      fontSize: 14,
                    }}
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
                  {isBrushVisible && (
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
