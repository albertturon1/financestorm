import { Line, LineChart, ResponsiveContainer, YAxis } from 'recharts';

import { customLineChartYDomain } from '@components/customLineChart/CustomLineChartHelpers';
import { LabelValue } from '@interfaces/ICharts';

import { chartColor } from './PopularCurrencyRatesItem';

const PopularCurrencyRatesItemChart = ({
  rates,
}: {
  rates: LabelValue[];
}) => {
  const values = rates.map((r) => r.value);
  const yDomain = customLineChartYDomain(values, 1);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={rates}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <YAxis domain={yDomain} hide />
        <Line
          type="monotone"
          dataKey="value"
          stroke={chartColor(values)}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default PopularCurrencyRatesItemChart;
