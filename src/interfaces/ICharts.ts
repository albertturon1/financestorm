import { CHART_RANGES } from '@constants/Chart';

import { Currencies } from './ICurrency';
import { AnyObject } from './IUtility';

export interface RechartsData {
  name: string;
  value: number;
  quantity: number;
  baseValue: number;
}

export interface DateValue {
  label: string;
  value: number;
}

export type WalletQuoteCurrencyValue = {
  currency: Currencies;
  value: number;
};

export type WalletBaseCurrencyValue = {
  amount: number;
  rate: number;
} & WalletQuoteCurrencyValue;

export interface WalletDay extends DateValue {
  baseCurrencies: WalletBaseCurrencyValue[];
  quoteCurrency: WalletQuoteCurrencyValue;
}

export type ChartMultiData<T> = {
  name: string;
  data: T[];
};

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
