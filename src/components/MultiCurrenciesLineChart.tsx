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

const MultiCurrenciesLineChart = ({ data }: { data: RechartsMultiData[] }) => {
  const values = data.flatMap((c) => c.data.map((d) => d.value));
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const yDomain = [Math.floor(minValue), Math.ceil(maxValue)];
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
          right: 30,
          left: -15,
          bottom: 0,
        }}
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
          allowDecimals={false}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          tickFormatter={abbreviate as any}
          domain={yDomain}
        />
        {data.map((s, index) => (
          <Line
            strokeWidth={2}
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
          y={minValue}
          stroke={CHART_THEME.slice(-2)[0]}
          strokeDasharray="3 4"
        >
          <Label
            value={`Min: ${minValue}`}
            position="bottom"
            {...referenceLineLabel}
          />
        </ReferenceLine>
        <ReferenceLine
          y={maxValue}
          stroke={CHART_THEME.slice(-1)[0]}
          strokeDasharray="3 4"
        >
          <Label
            value={`Max: ${maxValue}`}
            position="top"
            {...referenceLineLabel}
          />
        </ReferenceLine>
        <Tooltip
          cursor={false}
          labelFormatter={(name) => `Dzień: ${name as string}`}
          labelStyle={{ color: 'white', fontSize: 16, fontWeight: 700 }}
          contentStyle={{ backgroundColor: '#161616' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MultiCurrenciesLineChart;
