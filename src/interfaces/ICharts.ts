import { CHART_RANGES } from '@constants/chartRange';

import { NormalizedCurrencyExchangeRate } from './models/IExchangerate';
import { AnyObject } from './Utility';

export interface RechartsData {
  name: string;
  value: number;
  quantity: number;
  baseValue: number;
}

export interface LabelValue {
  label: string;
  value: number;
}

export interface RechartsMultiData {
  name: string;
  data: NormalizedCurrencyExchangeRate[];
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

export type ChartType = 'bar' | 'pie' | 'line';
export type ChartRangeType = 'day' | 'week' | 'month' | 'year';
export type ChartRange = { name: string; type: ChartRangeType; value: number };
export type ChartRanges = (typeof CHART_RANGES)[number];
