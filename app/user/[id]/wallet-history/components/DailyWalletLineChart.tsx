import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
  ReferenceLine,
  TooltipProps,
  ComposedChart,
} from 'recharts';

import FlagCountryCode from '@components/FlagCountryCode';
import { BALANCE_PERCENTAGE_COLORS } from '@features/user/components/CurrencyBalancePercentage/UserBalancePercentage';
import { MonthlyWalletValue } from '@hooks/useGetWalletValueOverTime';
import { roundNumber } from '@utils/misc';

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active) return null;
  return (
    <div className="gap-y-3 rounded border border-slate-50 bg-secondaryBlack p-4">
      <div className="flex gap-x-2">
        <p className="font-semibold">{payload[0].payload.quantity}</p>
        <FlagCountryCode
          reversez
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

const DailyWalletLineChart = ({ data }: { data: MonthlyWalletValue[] }) => {
  const values = data.map((e) => e.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" angle={90} dy={50} height={120} />
        <YAxis
          type="number"
          domain={[
            roundNumber(minValue * 0.99, 0),
            roundNumber(maxValue * 1.01, 0),
          ]}
          tickCount={10}
          allowDecimals={false}
        />
        <Tooltip />
        <ReferenceLine
          y={maxValue}
          label="Max"
          stroke={BALANCE_PERCENTAGE_COLORS[1]}
          strokeDasharray="3 3"
        />
        <ReferenceLine
          y={minValue}
          label="Min"
          stroke={BALANCE_PERCENTAGE_COLORS[1]}
          strokeDasharray="3 3"
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={BALANCE_PERCENTAGE_COLORS[0]}
          dot={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DailyWalletLineChart;
