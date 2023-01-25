'use client';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import abbreviate from 'number-abbreviate';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  ReferenceLine,
  Label,
} from 'recharts';

import { CHART_THEME } from '@constants/chartTheme';
import { RechartsMultiData } from '@interfaces/ICharts';

import WalletValueOverTimeTooltip from './WalletValueOverTimeTooltip';

const WalletValueOverTimeLineChart = ({
  data,
}: {
  data: RechartsMultiData[];
}) => {
  const values = data.flatMap((c) => c.data.map((d) => d.value));
  const minValue = Math.min(...values) - Math.min(...values) * 0.05;
  const maxValue = Math.max(...values) + Math.max(...values) * 0.05;
  const yDomain = [minValue, maxValue];

  const referenceLineLabel = {
    offset: 20,
    fontSize: 18,
    fontWeight: 700,
  };

  return (
    <ResponsiveContainer>
      <LineChart
        margin={{
          top: 5,
          right: 35,
          left: 20,
          bottom: 0,
        }}
        syncId="anyId"
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis
          dataKey="label"
          angle={90}
          dy={50}
          height={120}
          allowDuplicatedCategory={false}
        />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
        <YAxis
          domain={yDomain}
          allowDecimals={false}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
          tickFormatter={abbreviate as any}
          tickCount={7}
        />
        {data.map((s, index) => (
          <Line
            dataKey="value"
            data={s.data}
            name={s.name}
            key={s.name}
            type="monotone"
            stroke={CHART_THEME[index]}
            dot={false}
          />
        ))}
        <ReferenceLine
          label="Min"
          stroke={CHART_THEME.slice(-1)[0]}
          strokeDasharray="3 4"
        >
          <Label
            value={`Min: ${minValue}`}
            position="bottom"
            {...referenceLineLabel}
          />
        </ReferenceLine>
        <ReferenceLine
          label="Max"
          stroke={CHART_THEME.slice(-1)[0]}
          strokeDasharray="3 4"
        >
          <Label
            value={`Max: ${maxValue}`}
            position="top"
            {...referenceLineLabel}
          />
        </ReferenceLine>
        <Tooltip content={<WalletValueOverTimeTooltip />} cursor={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WalletValueOverTimeLineChart;
