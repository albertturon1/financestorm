import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
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
          code={payload[0].name?.toLowerCase() as string}
          flagClassName="w-4"
        />
      </div>
      {payload[0].name !== 'PLN' && (
        <p className="font-semibold">{`${payload[0].payload.baseValue} PLN`}</p>
      )}
      <p className="font-semibold">{`${payload[0].value}% portfela`}</p>
    </div>
  );
};

const UserBalancePercentagePieChart = ({ data }: { data: RechartsData[] }) => (
  <ResponsiveContainer>
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name">
        {data.map((_entry, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Cell
            // eslint-disable-next-line react/no-array-index-key
            key={`cell-${index}`}
            fill={
              BALANCE_PERCENTAGE_COLORS[
                index % BALANCE_PERCENTAGE_COLORS.length
              ]
            }
          />
        ))}
      </Pie>
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
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  </ResponsiveContainer>
);

export default UserBalancePercentagePieChart;
