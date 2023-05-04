import { DateTime, DateTimeFormatOptions } from 'luxon';

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

import { SERVER_DATE } from './dateTime';

export const CHART_TIMESPANS = {
  '1W': DateTime.now().minus({ weeks: 1 }).toFormat(SERVER_DATE),
  '1M': DateTime.now().minus({ months: 1 }).toFormat(SERVER_DATE),
  '1Y': DateTime.now().minus({ years: 1 }).toFormat(SERVER_DATE),
  // '2Y': DateTime.now().minus({ years: 2 }).toFormat(SERVER_DATE),
  // '5Y': DateTime.now().minus({ years: 5 }).toFormat(SERVER_DATE),
  // '10Y': DateTime.now().minus({ years: 10 }).toFormat(SERVER_DATE),
};
