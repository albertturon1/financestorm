'use client';

import { useCallback } from 'react';

// import { DateTime } from 'luxon';
import { TooltipProps } from 'recharts';

import CustomLineChart, {
  customLineChartYDomain,
} from '@components/customLineChart/CustomLineChart';
import { xAxisDateTickFormatter } from '@components/customLineChart/CustomLineChartHelpers';
// import { CHART_THEME } from '@constants/Chart';
import { ChartMultiData, WalletDay } from '@interfaces/ICharts';
import { nameOfKey } from '@utils/misc';

// import InflationOverMonthsTooltip from './InflationOverMonthsTooltip';
import WalletValueOverTimeTooltip from './WalletValueOverTimeTooltip';
import { InflationWalletOverTimeValue } from '../tools/inflationWalletOverTimeValue';

type ChartDataType = InflationWalletOverTimeValue | WalletDay;

const nameExtractor = (item: ChartMultiData<ChartDataType>) => item.name;
const dataExtractor = (item: ChartMultiData<ChartDataType>) => item.data;
const dataKeyExtractor = (item: ChartMultiData<ChartDataType>) =>
  nameOfKey(item.data[0], (x) => x.value);

const xAxisLabelExtractor = (item: ChartMultiData<ChartDataType>) =>
  nameOfKey(item.data[0], (x) => x.label);

// const inflationNameExtractor = () => 'Skumulowana inflacja';

// const inflationDataKeyExtractor = (
//   item: ChartMultiData<InflationWalletOverTimeValue>,
// ) => nameOfKey(item.data[0], (x) => x.cumulativeInflation);

// WIP

const WalletOverTimeCharts = ({
  chartData,
}: {
  chartData: readonly [
    {
      readonly name: 'Wartość portfela';
      readonly data: WalletDay[];
    },
    // {
    //   readonly name: 'Realna wartość portfela';
    //   readonly data: InflationWalletOverTimeValue[];
    // },
  ];
}) => {
  const todayWalletValue = chartData[0].data.slice(-1)[0].value;
  // const doesInflationDataExits = !!chartData[1].data.length;
  // const lastRangeMonth = doesInflationDataExits
  //   ? DateTime.fromISO(chartData[1].data.slice(-1)[0].label).toFormat(
  //       'LLL yyyy',
  //     )
  //   : '';

  const walletValueYDomain = customLineChartYDomain(
    chartData.flatMap((c) => c.data.map((d) => d.value)),
    2,
  );

  const syncId = 'anyId';

  const walletValueTooltip = useCallback(
    (props: TooltipProps<number, string>) => (
      <WalletValueOverTimeTooltip
        currentWalletValue={todayWalletValue}
        {...props}
      />
    ),
    [todayWalletValue],
  );
  // const inflationChartTooltip = useCallback(
  //   (props: TooltipProps<number, string>) => (
  //     <InflationOverMonthsTooltip lastRangeMonth={lastRangeMonth} {...props} />
  //   ),
  //   [lastRangeMonth],
  // );

  return (
    <div className="flex flex-1 flex-col">
      <div className="w-full flex-1">
        <CustomLineChart
          data={chartData}
          dataKeyExtractor={dataKeyExtractor}
          dataExtractor={dataExtractor}
          nameExtractor={nameExtractor}
          xAxisLabelExtractor={xAxisLabelExtractor}
          tickCount={10}
          yDomain={walletValueYDomain}
          xAxisLabel="label"
          syncId={syncId}
          xAxisTickFormatter={xAxisDateTickFormatter}
          tooltip={walletValueTooltip}
        />
      </div>
      {/* {doesInflationDataExits && (
        <div className="h-1/6 w-full">
          <CustomLineChart
            data={[chartData[1]]}
            dataKeyExtractor={inflationDataKeyExtractor}
            dataExtractor={dataExtractor}
            xAxisLabelExtractor={xAxisLabelExtractor}
            xAxisLabel="label"
            hideXAxis
            nameExtractor={inflationNameExtractor}
            lineColor={CHART_THEME.slice(-1)[0]}
            syncId={syncId}
            tooltip={inflationChartTooltip}
            tooltipWrapperStyle={{ marginTop: -100 }}
          />
        </div>
      )} */}
    </div>
  );
};

export default WalletOverTimeCharts;
