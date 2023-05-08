import { DateTimeFormatOptions } from 'luxon';

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

export const CHART_X_AXIS_TICK_FORMATTER_OPTIONS = {
  month: 'short',
  day: 'numeric',
  year: '2-digit',
} satisfies DateTimeFormatOptions;

export const CHART_TOOLTIP_DATE_OPTIONS = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
} satisfies DateTimeFormatOptions;
