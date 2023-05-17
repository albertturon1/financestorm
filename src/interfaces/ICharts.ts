import { TIMESPANS } from '@constants/timespans';

import { AnyObject } from './IUtility';

export interface DateValue {
  date: string;
  value: number;
}

export type CustomTooltipProps<T extends AnyObject<T>> = {
  strokeWidth: number;
  name: string;
  stroke: string;
  fill: string;
  points: number[];
  dataKey: string;
  color: string;
  value: number;
  payload: T;
};

export type Timespan = keyof typeof TIMESPANS;
