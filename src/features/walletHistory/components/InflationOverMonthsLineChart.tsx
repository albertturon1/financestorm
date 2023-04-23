'use client';

import { DateTime } from 'luxon';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from 'recharts';

import { CHART_THEME } from '@constants/chart';
import { NormalizedCurrencyExchangeRate } from '@interfaces/models/IExchangerate';

import InflationOverMonthsTooltip from './InflationOverMonthsTooltip';

const InflationOverMonthsLineChart = ({
  data,
}: {
  data: NormalizedCurrencyExchangeRate[];
}) => {
  const lastRangeMonth = DateTime.fromISO(data.slice(-1)[0].date).toFormat(
    'LLL yyyy',
    { locale: 'pl' },
  );

  return (
    <ResponsiveContainer>
      <LineChart
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        data={data}
        syncId="anyId"
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="label" angle={90} dy={50} height={100} hide />
        <YAxis allowDecimals={false} />
        <Line
          dataKey="cumulativeInflation"
          type="monotone"
          dot={false}
          stroke={CHART_THEME.slice(-1)[0]}
          strokeWidth={3}
        />
        <Tooltip
          content={
            <InflationOverMonthsTooltip lastRangeMonth={lastRangeMonth} />
          }
          cursor={false}
          labelFormatter={(name) => `Dzień: ${name as string}`}
          labelStyle={{ color: 'white', fontSize: 16, fontWeight: 700 }}
          contentStyle={{ backgroundColor: '#161616' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default InflationOverMonthsLineChart;
