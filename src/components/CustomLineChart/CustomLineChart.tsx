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

import { CHART_THEME } from '@constants/Chart';
import useWindowSize from '@hooks/useWindowSize';
import { cutNumber } from '@utils/misc';

import { xAxisIntervalDivider } from './CustomLineChartHelpers';
import Loader from '../Loader';

export const customLineChartYDomain = (
  values: number[],
  multiplier = 5, //in percent
  round = 2,
) => {
  const multi = multiplier / 100;

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const rMinValue = cutNumber(minValue - minValue * multi, round);
  const rMaxValue = cutNumber(maxValue + maxValue * multi, round);
  return [rMinValue, rMaxValue];
};

export type CustomLineChartProps<T, Y> = {
  dataKeyExtractor: (item: T) => string;
  xAxisLabelExtractor: (item: T) => string;
  nameExtractor: (item: T) => string;
  dataExtractor: (item: T, index: number) => Y[];
  data: readonly T[] | T[];
  tooltip?: (props: TooltipProps<number, string>) => ReactElement;
  children?: ReactNode;
  yDomain?: AxisDomain;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xAxisTickFormatter?: (value: any, i: number) => string;
  xAxisLabel?: string;
  yAxisTickCount?: number;
  xAxisInterval?: 'preserveStart' | 'preserveEnd' | 'preserveStartEnd' | number;
  hideXAxis?: boolean;
  lineColor?: string;
  tooltipWrapperStyle?: CSSProperties;
  legend?: boolean;
} & Omit<
  Partial<XAxisProps & YAxisProps & LineProps & CategoricalChartProps>,
  'data' | 'ref' | 'domain'
>;

/**
 * @param dataKeyExtractor - The key or getter of a group of data which should be unique in a LineChart
 * @param dataExtractor - extract object with label and value
 * @param nameExtractor - extract name of the dataset (used in legend)
 * @param keyExtractor - The second input number
 * @returns Component to render generic line charts
 */

const CustomLineChart = <T, Y>({
  data,
  xAxisLabelExtractor,
  dataKeyExtractor,
  nameExtractor,
  dataExtractor,
  tooltip,
  children,
  yDomain,
  xAxisTickFormatter,
  hideXAxis,
  lineColor,
  tooltipWrapperStyle,
  yAxisTickCount,
  legend = true,
  xAxisInterval,
  ...props
}: CustomLineChartProps<T, Y>) => {
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsLoading(true);
  }, [data]);

  return (
    <div className="relative flex h-full w-full">
      {isLoading && <CustomLineChartLoader />}
      <ResponsiveContainer className="select-none">
        <LineChart {...props} syncId="anyId">
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            dataKey={xAxisLabelExtractor(data[0])}
            interval={
              xAxisInterval ??
              Math.ceil(
                dataExtractor(data[0], 0).length / xAxisIntervalDivider(width),
              )
            }
            dy={50}
            height={100}
            allowDuplicatedCategory={false}
            {...props}
            hide={hideXAxis}
            tickFormatter={xAxisTickFormatter}
          />
          {legend && (
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          )}
          <YAxis
            type="number"
            {...props}
            domain={yDomain}
            tickCount={yAxisTickCount}
            tickFormatter={(value: number) =>
              new Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short',
              }).format(value)
            }
          />
          {data.map((chart, index) => (
            <Line
              strokeWidth={2}
              dataKey={dataKeyExtractor(chart)}
              data={dataExtractor(chart, index)}
              name={nameExtractor(chart)} //line legend
              key={nameExtractor(chart)}
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
  <div className="absolute z-50 flex h-full w-full items-center justify-center gap-x-10 bg-slate-900/20 pt-10">
    <div className="flex aspect-square w-10">
      <Loader />
    </div>
    <p className="text-2xl font-bold">{'Loading chart...'}</p>
  </div>
);

const Memo = memo(CustomLineChart);
export default Memo as typeof CustomLineChart;
