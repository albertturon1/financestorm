import { DateTime } from 'luxon';

import { ChartTimespan } from '@interfaces/ICharts';

import { SERVER_DATE } from './dateTime';

export const TIMESPANS = {
  '1W': DateTime.now().minus({ weeks: 1 }).toFormat(SERVER_DATE),
  '1M': DateTime.now().minus({ months: 1 }).toFormat(SERVER_DATE),
  '1Y': DateTime.now().minus({ years: 1 }).toFormat(SERVER_DATE),
  // '2Y': DateTime.now().minus({ years: 2 }).toFormat(SERVER_DATE),
  // '5Y': DateTime.now().minus({ years: 5 }).toFormat(SERVER_DATE),
  // '10Y': DateTime.now().minus({ years: 10 }).toFormat(SERVER_DATE),
};
export const DEFAULT_TIMESPAN = '1Y' satisfies ChartTimespan;
