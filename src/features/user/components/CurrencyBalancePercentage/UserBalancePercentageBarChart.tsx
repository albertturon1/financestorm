import {
  BarChart,
  Bar,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
  XAxis,
  YAxis,
  ComposedChart,
} from 'recharts';

import FlagCountryCode from '@components/FlagCountryCode';
import { RechartsData } from '@interfaces/api/ICharts';

import { BALANCE_PERCENTAGE_COLORS } from './UserBalancePercentage';

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active) return null;
  return (
    <div className="gap-y-3 rounded border border-slate-50 bg-secondaryBlack p-4">
      <div className="flex gap-x-2">
        <p className="font-semibold">{payload[0].payload.quantity}</p>
        <FlagCountryCode
          reverse
          code={payload[0].payload.name?.toLowerCase() as string}
          flagClassName="w-4"
        />
      </div>
      {payload[0].payload.name !== 'PLN' && (
        <p className="font-semibold">{`${payload[0].payload.baseValue} PLN`}</p>
      )}
      <p className="font-semibold">{`${payload[0].value}% portfela`}</p>
    </div>
  );
};

const UserBalancePercentageBarChart = ({ data }: { data: RechartsData[] }) => (
  <ResponsiveContainer>
    <ComposedChart
      data={data}
      margin={{
        top: 5,
        bottom: 5,
        left: -20,
        right: 0,
      }}
    >
      <Bar dataKey="value">
        {data.map((_entry, index) => (
          <Cell
            // eslint-disable-next-line react/no-array-index-key
            key={`cell-${index}`}
            fill={BALANCE_PERCENTAGE_COLORS[index]}
          />
        ))}
      </Bar>
      <Legend
        payload={data.map((item, index) => ({
          id: item.name,
          type: 'square',
          value: `${item.name} (${item.value}%)`,
          color: BALANCE_PERCENTAGE_COLORS[index],
        }))}
        layout="vertical"
        verticalAlign="middle"
        align="right"
      />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} cursor={false} />
    </ComposedChart>
  </ResponsiveContainer>
);

export default UserBalancePercentageBarChart;
