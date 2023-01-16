import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from 'recharts';

import { RechartsData } from '@interfaces/ICharts';

const CurrencyPairLineChart = ({ data }: { data: RechartsData[] }) => (
  <ResponsiveContainer>
    <LineChart
      data={data}
      margin={{ top: 10, right: 30, left: -30, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="label" angle={90} dy={50} height={120} />
      <YAxis tickCount={10} />
      <Tooltip />

      <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

export default CurrencyPairLineChart;
