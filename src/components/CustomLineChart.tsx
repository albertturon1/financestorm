'use client';

import {
  CSSProperties,
  memo,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  XAxisProps,
  YAxisProps,
  LineProps,
  TooltipProps,
} from 'recharts';
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart';
import { AxisDomain } from 'recharts/types/util/types';

import { CHART_THEME } from '@constants/chartTheme';
import { cutNumber } from '@utils/misc';

export const customLineChartYDomain = (
  values: number[],
  round = 2,
  multiplier = 1.1,
) => {
  const mutli = 1.11 - multiplier;
  const minValue = Math.min(...values) - Math.min(...values) * mutli;
  const maxValue = Math.max(...values) + Math.max(...values) * mutli;

  return [cutNumber(minValue, round), cutNumber(maxValue, round)];
};

export type CustomLineChartProps<T, Y> = {
  dataKeyExtractor: (item: T) => string;
  nameExtractor: (item: T) => string;
  keyExtractor: (item: T) => number | string;
  dataExtractor: (item: T, index: number) => Y[];
  data: T[];
  tooltip?: (props: TooltipProps<number, string>) => ReactElement;
  children?: ReactNode;
  yDomain?: AxisDomain;
  xAxisLabel?: string;
  yAxisTickCount?: number;
  hideXAxis?: boolean;
  lineColor?: string;
  tooltipWrapperStyle?: CSSProperties;
  legend?: boolean;
} & Omit<
  Partial<XAxisProps & YAxisProps & LineProps & CategoricalChartProps>,
  'data' | 'ref' | 'domain'
>;

const CustomLineChart = <T, Y>({
  data,
  dataKeyExtractor,
  nameExtractor,
  keyExtractor,
  dataExtractor,
  tooltip,
  children,
  yDomain,
  xAxisLabel,
  hideXAxis,
  lineColor,
  tooltipWrapperStyle,
  yAxisTickCount,
  legend = true,
  ...props
}: CustomLineChartProps<T, Y>) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    console.log('data changed');
  }, [data]);

  return (
    <div className="relative flex h-full w-full">
      {/*{isLoading && <CustomLineChartLoader />}*/}
      <ResponsiveContainer className="select-none">
        <LineChart
          margin={{
            top: 5,
            right: 0,
            left: 20,
            bottom: 0,
          }}
          data={data}
          {...props}
          syncId="anyId"
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            dataKey={xAxisLabel}
            angle={90}
            dy={50}
            height={100}
            allowDuplicatedCategory={false}
            {...props}
            hide={hideXAxis}
          />
          {legend && (
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          )}
          <YAxis
            type="number"
            {...props}
            domain={yDomain}
            tickCount={yAxisTickCount}
          />
          {data.map((chart, index) => (
            <Line
              strokeWidth={2}
              dataKey={dataKeyExtractor(chart)}
              data={dataExtractor(chart, index)}
              name={nameExtractor(chart)} //line legend
              key={keyExtractor(chart)}
              stroke={lineColor ?? CHART_THEME[index % CHART_THEME.length]}
              dot={false}
              {...props}
              type={props.type ?? 'monotone'}
              onAnimationStart={() => {
                setIsLoading(false);
              }}
            />
          ))}
          {children}
          <Tooltip
            content={tooltip}
            cursor={false}
            wrapperStyle={tooltipWrapperStyle}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomLineChartLoader = () => (
  <div className="absolute flex h-full w-full items-center justify-center bg-blue-900/10">
    <p className="text-2xl font-bold">{'Loading chart...'}</p>
  </div>
);

const Memo = memo(CustomLineChart);
export default Memo as typeof CustomLineChart;
