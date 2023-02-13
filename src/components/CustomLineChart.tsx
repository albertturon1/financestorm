'use client';

import { CSSProperties, ReactElement, ReactNode } from 'react';

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
} from 'recharts';
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart';
import { AxisDomain } from 'recharts/types/util/types';

import { CHART_THEME } from '@constants/chartTheme';
import { cutNumber } from '@utils/misc';

export const customLineChartYDomain = (values: number[], round = 2) => {
  const minValue = Math.min(...values) - Math.min(...values) * 0.01;
  const maxValue = Math.max(...values) + Math.max(...values) * 0.01;

  return [cutNumber(minValue, round), cutNumber(maxValue, round)];
};

export type CustomLineChartProps<T, Y> = {
  dataKeyExtractor: (item: T) => string;
  nameExtractor: (item: T) => string;
  keyExtractor: (item: T) => number | string;
  dataExtractor: (item: T, index: number) => Y[];
  data: T[];
  tooltip?: ReactElement;
  children?: ReactNode;
  yDomain?: AxisDomain;
  xAxisLabel?: string;
  yAxisTickCount?: number;
  hideXAxis?: boolean;
  lineColor?: string;
  tooltipWrapperStyle?: CSSProperties;
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
  ...props
}: CustomLineChartProps<T, Y>) => (
  <ResponsiveContainer className="select-none">
    <LineChart
      margin={{
        top: 5,
        right: 0,
        left: 0,
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
      <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
      <YAxis
        type="number"
        domain={yDomain}
        {...props}
        tickCount={yAxisTickCount}
      />
      {data.map((chart, index) => (
        <Line
          strokeWidth={2}
          dataKey={dataKeyExtractor(chart)}
          data={dataExtractor(chart, index)}
          name={nameExtractor(chart)} //line legend
          key={keyExtractor(chart)}
          stroke={lineColor ?? CHART_THEME[index]}
          dot={false}
          {...props}
          type={props.type ?? 'monotone'}
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
);

export default CustomLineChart;
