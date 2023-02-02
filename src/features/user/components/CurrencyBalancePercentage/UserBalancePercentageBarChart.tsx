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

import { CHART_THEME } from '@constants/chartTheme';
import { UserBalanceChart } from '@features/user/interfaces/IUserBalance';

import UserBalancePercentageTooltip from './UserBalancePercentageTooltip';

const UserBalancePercentageBarChart = ({
  data,
  quote_currency,
}: UserBalanceChart) => (
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
      <Bar dataKey="percentage">
        {data
          .sort((a, b) => (a.percentage > b.percentage ? -1 : 1))
          .map((_entry, index) => (
            <Cell
              // eslint-disable-next-line react/no-array-index-key
              key={`cell-${index}`}
              fill={CHART_THEME[index]}
            />
          ))}
      </Bar>
      <Legend
        payload={data.map((item, index) => ({
          id: item.currency,
          type: 'square',
          value: `${item.currency} (${item.percentage}%)`,
          color: CHART_THEME[index],
          fontVariant: 'tabular-nums'
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
      <YAxis />
      <Tooltip
        content={
          <UserBalancePercentageTooltip quote_currency={quote_currency} />
        }
        cursor={false}
      />
    </ComposedChart>
  </ResponsiveContainer>
);

export default UserBalancePercentageBarChart;
