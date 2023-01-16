import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { RechartsData } from '@interfaces/ICharts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart = ({ data, title }: { data: RechartsData; title?: string }) => (
  <Line
    options={{
      responsive: true,
      plugins: {
        title: {
          display: !!title,
          text: title,
        },
      },
    }}
    data={data}
  />
);

export default LineChart;
