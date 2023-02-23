'use client';

import { useCallback } from 'react';

import { TooltipProps } from 'recharts';

import CustomLineChart, {
  customLineChartYDomain,
} from '@components/CustomLineChart';
import { CHART_THEME } from '@constants/chartTheme';
import { RechartsMultiData } from '@interfaces/ICharts';
import { nameOfKey, serverDateToParts } from '@utils/misc';

import InflationOverMonthsTooltip from './InflationOverMonthsTooltip';
import WalletValueOverTimeTooltip from './WalletValueOverTimeTooltip';

const keyExtractor = (item: RechartsMultiData) => item.name;
const dataExtractor = (item: RechartsMultiData) => item.data;
const dataKeyExtractor = (item: RechartsMultiData) =>
  nameOfKey(item.data[0], (x) => x.value);
const inflationNameExtractor = () => 'Skumulowana inflacja';

const inflationDataKeyExtractor = (item: RechartsMultiData) =>
  nameOfKey(item.data[0], (x) => x.cumulativeInflation);

const WalletOverTimeCharts = ({
  chartData,
}: {
  chartData: RechartsMultiData[];
}) => {
  const currentWalletValue = chartData[0].data.slice(-1)[0].value;
  const lastRangeMonth = serverDateToParts(
    chartData[1].data.slice(-1)[0].label,
    'month',
  );

  const values = chartData.flatMap((c) => c.data.map((d) => d.value));
  const walletValueYDomain = customLineChartYDomain(values);
  const syncId = 'anyId';

  const tooltip = useCallback(
    (props: TooltipProps<number, string>) => (
      <WalletValueOverTimeTooltip
        currentWalletValue={currentWalletValue}
        {...props}
      />
    ),
    [currentWalletValue],
  );
  const inflationTooltip = useCallback(
    (props: TooltipProps<number, string>) => (
      <InflationOverMonthsTooltip lastRangeMonth={lastRangeMonth} {...props} />
    ),
    [lastRangeMonth],
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="h-5/6 w-full">
        <CustomLineChart
          data={chartData}
          dataKeyExtractor={dataKeyExtractor}
          dataExtractor={dataExtractor}
          nameExtractor={keyExtractor}
          keyExtractor={keyExtractor}
          tickCount={10}
          yDomain={walletValueYDomain}
          xAxisLabel="label"
          syncId={syncId}
          tooltip={tooltip}
        />
      </div>
      <div className="h-1/6 w-full">
        <CustomLineChart
          data={chartData.slice(1, 2)}
          dataKeyExtractor={inflationDataKeyExtractor}
          dataExtractor={dataExtractor}
          xAxisLabel="label"
          hideXAxis
          nameExtractor={inflationNameExtractor}
          keyExtractor={keyExtractor}
          lineColor={CHART_THEME.slice(-1)[0]}
          syncId={syncId}
          tooltip={inflationTooltip}
          tooltipWrapperStyle={{ marginTop: -100 }}
        />
      </div>
    </div>
  );
};

export default WalletOverTimeCharts;
