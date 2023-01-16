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
} from 'recharts';

import FlagCountryCode from '@components/FlagCountryCode';
import { BALANCE_PERCENTAGE_COLORS } from '@features/user/components/CurrencyBalancePercentage/UserBalancePercentage';
import { MonthlyWalletValue } from '@hooks/useGetWalletValueOverTime';
import { roundNumber } from '@utils/misc';

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload) return null;
  const values = payload[0].payload;
  const row = 'flex gap-x-2 items-center w-full';
  const flag = 'mb-1';
  return (
    <div className="rounded border border-slate-50 bg-secondaryBlack p-4">
      <p className="pb-3">{`Data: ${values.label}`}</p>
      {['eur', 'usd', 'gbp', 'chf'].map((currency, index) => {
        const name = currency.toUpperCase();
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="mb-5 gap-y-2">
            <div className={`${row} ${flag}`}>
              <p>{values[currency]}</p>
              <FlagCountryCode
                reverse
                code={currency}
                flagStyle={{ width: currency === 'chf' ? 17 : 24 }}
                boldName={false}
              />
            </div>
            <div className={row}>
              <p>{`Kurs ${name}/PLN: `}</p>
              <p>{values[`${currency}_rate`]}</p>
            </div>
            <div className={row}>
              <p>{`Wartość ${name} (w PLN)`}</p>
              <p>{values[`${currency}_value`]}</p>
            </div>
            <p>{`${roundNumber(
              (values[`${currency}_value`] / values.value) * 100,
              2,
            )}% portfela`}</p>
          </div>
        );
      })}
      <div className={`${row} ${flag}`}>
        <p>{`${values.pln}`}</p>
        <FlagCountryCode
          reverse
          code={'pln'}
          flagStyle={{ width: 24 }}
          boldName={false}
        />
      </div>
      <p>{`${roundNumber((values.pln / values.value) * 100, 2)}% portfela`}</p>
      <div className={`${row} pt-5`}>
        <p>{`Łączna wartość portfela: `}</p>
        <p>{`${values.value} PLN`}</p>
      </div>
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
