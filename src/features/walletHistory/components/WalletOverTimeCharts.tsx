import { TooltipProps } from 'recharts';

import CustomLineChart, {
  customLineChartYDomain,
} from '@components/CustomLineChart';
import { CHART_THEME } from '@constants/chartTheme';
import { ChartMultiData, WalletDay } from '@interfaces/ICharts';
import { nameOfKey, serverDateToParts } from '@utils/misc';

import InflationOverMonthsTooltip from './InflationOverMonthsTooltip';
import WalletValueOverTimeTooltip from './WalletValueOverTimeTooltip';
import { InflationWalletOverTimeValue } from '../tools/inflationWalletOverTimeValue';

type ChartDataType = InflationWalletOverTimeValue | WalletDay;

const keyExtractor = (item: ChartMultiData<ChartDataType>) => item.name;
const dataExtractor = (item: ChartMultiData<ChartDataType>) => item.data;
const dataKeyExtractor = (item: ChartMultiData<ChartDataType>) =>
  nameOfKey(item.data[0], (x) => x.value);
const inflationNameExtractor = () => 'Skumulowana inflacja';

const inflationDataKeyExtractor = (
  item: ChartMultiData<InflationWalletOverTimeValue>,
) => nameOfKey(item.data[0], (x) => x.cumulativeInflation);

const WalletOverTimeCharts = ({
  chartData,
}: {
  chartData: readonly [
    {
      readonly name: 'Wartość portfela';
      readonly data: WalletDay[];
    },
    {
      readonly name: 'Realna wartość portfela';
      readonly data: InflationWalletOverTimeValue[];
    },
  ];
}) => {
  const todayWalletValue = chartData[0].data.slice(-1)[0].value;
  const lastRangeMonth = serverDateToParts(
    chartData[1].data.slice(-1)[0].label,
    'month',
  );

  const walletValueYDomain = customLineChartYDomain(
    chartData.flatMap((c) => c.data.map((d) => d.value)),
    2,
  );

  const syncId = 'anyId';

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
          tooltip={(props) => (
            <WalletValueOverTimeTooltip
              currentWalletValue={todayWalletValue}
              {...props}
            />
          )}
        />
      </div>
      <div className="h-1/6 w-full">
        <CustomLineChart
          data={chartData.slice(1)}
          dataKeyExtractor={inflationDataKeyExtractor}
          dataExtractor={dataExtractor}
          xAxisLabel="label"
          hideXAxis
          nameExtractor={inflationNameExtractor}
          keyExtractor={keyExtractor}
          lineColor={CHART_THEME.slice(-1)[0]}
          syncId={syncId}
          tooltip={(props) => (
            <InflationOverMonthsTooltip
              lastRangeMonth={lastRangeMonth}
              {...props}
            />
          )}
          tooltipWrapperStyle={{ marginTop: -100 }}
        />
      </div>
    </div>
  );
};

export default WalletOverTimeCharts;
