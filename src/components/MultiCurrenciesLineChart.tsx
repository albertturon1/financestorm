'use client';

import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  TooltipProps,
} from 'recharts';

import { BALANCE_PERCENTAGE_COLORS } from '@features/user/components/CurrencyBalancePercentage/UserBalancePercentage';
import { CurrencyRateData } from '@interfaces/api/ICurrenctyRateApi';

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="gap-y-3 rounded border border-slate-50 bg-secondaryBlack p-4">
      <p>{payload[0].payload.label}</p>
      {payload.map((data, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="flex gap-x-2">
          <p>{data?.payload.currency}</p>
          <p>{data?.payload.close}</p>
        </div>
      ))}
    </div>
  );
};

const MultiCurrenciesLineChart = ({
  data,
}: {
  data: (CurrencyRateData[] | undefined)[];
}) => (
  <ResponsiveContainer>
    <LineChart margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="label" angle={90} dy={50} height={120} />
      <YAxis />
      {data.map((d, index) => {
        if (!d || !d.length) return null;
        return (
          <Line
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            data={d}
            type="monotone"
            dataKey="close"
            stroke={BALANCE_PERCENTAGE_COLORS[index]}
            dot={false}
          />
        );
      })}
      <Tooltip content={<CustomTooltip />} cursor={false} />
    </LineChart>
  </ResponsiveContainer>
);

export default MultiCurrenciesLineChart;
