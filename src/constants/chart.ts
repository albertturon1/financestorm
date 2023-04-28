import { DateTimeFormatOptions } from 'luxon';

import { ChartRange } from '@interfaces/ICharts';

export const CHART_THEME = [
  '#36a2eb',
  '#ff6384',
  '#9966ff',
  '#ff9f40',
  '#4bc0c0',
  '#ffcd56',
  '#c9cbcf',
  '#27aeef',
  '#A55914',
  '#ea5545',
  '#726C2E',
  '#b33dc6',
];

export const CHART_RANGES: readonly ChartRange[] = [
  { name: '1D', type: 'day', value: 1 },
  { name: '1W', type: 'week', value: 1 },
  { name: '1M', type: 'month', value: 1 },
  { name: '3M', type: 'month', value: 3 },
  { name: '6M', type: 'month', value: 6 },
  { name: '1Y', type: 'year', value: 1 },
  { name: '3Y', type: 'year', value: 3 },
  { name: '5Y', type: 'year', value: 5 },
  { name: '10Y', type: 'year', value: 10 },
  { name: '15Y', type: 'year', value: 15 },
  { name: '20Y', type: 'year', value: 20 },
] as const;

export const CHART_X_AXIS_TICK_FORMATTER_OPTIONS = {
  month: 'short',
  day: 'numeric',
  year: '2-digit',
} satisfies DateTimeFormatOptions;