import {
  Bar,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ComposedChart,
} from 'recharts';

import { CHART_THEME } from '@constants/chart';
import { UserBalanceChart } from '@features/user/interfaces/IUserBalance';
import { Mutable } from '@interfaces/IUtility';

import UserBalancePercentageTooltip from './UserBalancePercentageTooltip';

const UserBalancePercentageBarChart = ({ data }: UserBalanceChart) => (
  <ResponsiveContainer>
    <ComposedChart
      data={data as Mutable<typeof data>}
      margin={{
        top: 5,
        bottom: 5,
        left: -20,
        right: 0,
      }}
    >
      <Bar dataKey="percentage">
        {[...data]
          .sort((a, b) => (a.percentage > b.percentage ? -1 : 1))
          .map((e, index) => (
            <Cell key={e.currency} fill={CHART_THEME[index]} />
          ))}
      </Bar>
      <Legend
        payload={data.map((item, index) => ({
          id: item.currency,
          type: 'square',
          value: `${item.currency} (${item.percentage}%)`,
          color: CHART_THEME[index],
          fontVariant: 'tabular-nums',
        }))}
        className="tabular-nums"
        layout="vertical"
        verticalAlign="middle"
        align="right"
        wrapperStyle={{
          paddingLeft: '30px',
        }}
      />
      <XAxis dataKey="currency" />
      <YAxis domain={[0, 100]} />
      <Tooltip content={<UserBalancePercentageTooltip />} cursor={false} />
    </ComposedChart>
  </ResponsiveContainer>
);

export default UserBalancePercentageBarChart;
