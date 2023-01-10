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

import { RechartData } from '@interfaces/api/ICharts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart = ({ data, title }: { data: RechartData; title?: string }) => (
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
