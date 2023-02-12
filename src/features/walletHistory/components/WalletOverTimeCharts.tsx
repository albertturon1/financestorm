'use client';

import CustomLineChart, {
  customLineChartYDomain,
} from '@components/CustomLineChart';
import { CHART_THEME } from '@constants/chartTheme';
import { RechartsMultiData } from '@interfaces/ICharts';
import { nameOfKey, serverDateToParts } from '@utils/misc';

import InflationOverMonthsTooltip from './InflationOverMonthsTooltip';
import WalletValueOverTimeTooltip from './WalletValueOverTimeTooltip';

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

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full h-5/6">
        <CustomLineChart
          data={chartData}
          dataKeyExtractor={(item) => nameOfKey(item.data[0], (x) => x.value)}
          dataExtractor={(item) => item.data}
          nameExtractor={(item) => item.name}
          keyExtractor={(item) => item.name}
          tickCount={10}
          yDomain={walletValueYDomain}
          xAxisLabel="label"
          syncId={syncId}
          tooltip={
            <WalletValueOverTimeTooltip
              currentWalletValue={currentWalletValue}
            />
          }
        />
      </div>
      <div className="w-full h-1/6">
        <CustomLineChart
          data={chartData.slice(1, 2)}
          dataKeyExtractor={(item) =>
            nameOfKey(item.data[0], (x) => x.cumulativeInflation)
          }
          dataExtractor={(item) => item.data}
          xAxisLabel="label"
          hideXAxis
          nameExtractor={() => 'Skumulowana inflacja'}
          keyExtractor={(item) => item.name}
          lineColor={CHART_THEME.slice(-1)[0]}
          syncId={syncId}
          tooltip={
            <InflationOverMonthsTooltip lastRangeMonth={lastRangeMonth} />
          }
          tooltipWrapperStyle={{ marginTop: -100 }}
        />
      </div>
    </div>
  );
};

export default WalletOverTimeCharts;
