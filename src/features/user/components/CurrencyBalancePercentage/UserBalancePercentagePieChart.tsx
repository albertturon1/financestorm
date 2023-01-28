import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { CHART_THEME } from '@constants/chartTheme';
import { UserBalanceChart } from '@features/user/interfaces/IUserBalance';

import UserBalancePercentageTooltip from './UserBalancePercentageTooltip';

const UserBalancePercentagePieChart = ({
  data,
  quote_currency,
}: UserBalanceChart) => (
  <ResponsiveContainer>
    <PieChart>
      <Pie data={data} dataKey="percentage">
        {data
          .sort((a, b) => (a.percentage > b.percentage ? -1 : 1))
          .map((_entry, index) => (
            <Cell
              // eslint-disable-next-line react/no-array-index-key
              key={`cell-${index}`}
              fill={CHART_THEME[index % CHART_THEME.length]}
            />
          ))}
      </Pie>
      <Legend
        payload={data.map((item, index) => ({
          id: item.currency,
          type: 'square',
          value: `${item.currency} (${item.percentage}%)`,
          color: CHART_THEME[index],
        }))}
        layout="vertical"
        verticalAlign="middle"
        align="right"
        wrapperStyle={{
          paddingLeft: '30px',
        }}
      />
      <Tooltip
        content={
          <UserBalancePercentageTooltip quote_currency={quote_currency} />
        }
        cursor={false}
      />
    </PieChart>
  </ResponsiveContainer>
);

export default UserBalancePercentagePieChart;
