import { CHART_RANGES, CHART_TIMESPANS } from '@constants/chart';

import { Currency } from './ICurrency';
import { AnyObject } from './IUtility';

export interface RechartsData {
  name: string;
  value: number;
  quantity: number;
  baseValue: number;
}

export interface LabelValue {
  date: string;
  value: number;
}

export type WalletQuoteCurrencyValue = {
  currency: Currency;
  value: number;
};

export type WalletBaseCurrencyValue = {
  amount: number;
  rate: number;
} & WalletQuoteCurrencyValue;

export interface WalletDay extends LabelValue {
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
export type ChartRanges = (typeof CHART_RANGES)[number];
export type ChartTimespan = keyof typeof CHART_TIMESPANS;
