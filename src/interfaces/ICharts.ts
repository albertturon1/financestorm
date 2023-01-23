import { NormalizedCurrencyExchangeRate } from './models/IExchangerate';

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

export type ChartType = 'bar' | 'pie' | 'line';
