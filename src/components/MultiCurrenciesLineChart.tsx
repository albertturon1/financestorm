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
  Brush,
  ComposedChart,
  Legend,
  ReferenceLine,
} from 'recharts';

import { BALANCE_PERCENTAGE_COLORS } from '@features/user/components/CurrencyBalancePercentage/UserBalancePercentage';
import { LabeledRates } from '@interfaces/models/IExchangerate';
import { roundNumber } from '@utils/misc';

import FlagCountryCode from './FlagCountryCode';

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="gap-y-3 rounded border border-slate-50 bg-secondaryBlack p-4 px-10">
      <p className="pb-2">{`Dzień: ${payload[0].payload.label}`}</p>
      {payload.map(({ payload }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="mb-1 flex items-center  gap-x-2">
          <div
            className="h-4 w-4"
            style={{ backgroundColor: BALANCE_PERCENTAGE_COLORS[index] }}
          />
          <FlagCountryCode
            reverse
            code={payload.from.toLowerCase()}
            flagStyle={{
              width: payload.from.toLowerCase() === 'chf' ? 17 : 24,
            }}
            boldName={false}
          />
          <p>{payload.value}</p>
        </div>
      ))}
    </div>
  );
};

const MultiCurrenciesLineChart = ({
  data,
}: {
  data: {
    data: LabeledRates[];
    name: string;
  }[];
}) => {
  const values = data.flatMap((c) => c.data.map((e) => e.value));
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  return (
    <div className="flex w-screen grow pb-5">
      <ResponsiveContainer>
        <LineChart
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          data={data.flatMap((c) => c)}
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
          <YAxis domain={[0, roundNumber(maxValue * 1.05, 3)]} />
          {data.map((d, index) => (
            <Line
              dataKey="value"
              data={d.data}
              name={d.name}
              key={d.name}
              type="monotone"
              stroke={BALANCE_PERCENTAGE_COLORS[index]}
              dot={false}
            />
          ))}
          <ReferenceLine
            y={minValue}
            label={{
              position: 'top',
              value: `Min: ${minValue}`,
              fill: 'red',
              fontSize: 17,
            }}
          />
          <ReferenceLine
            y={maxValue}
            label={{
              position: 'top',
              value: `Max: ${maxValue}`,
              fill: 'red',
              fontSize: 17,
            }}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MultiCurrenciesLineChart;
