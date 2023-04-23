import { DateTime } from 'luxon';

import { SERVER_DATE } from './dateTime';

const CHART_TIMESPANS = {
  '1W': DateTime.now().minus({ weeks: 1 }).toFormat(SERVER_DATE),
  '1M': DateTime.now().minus({ months: 1 }).toFormat(SERVER_DATE),
  '1Y': DateTime.now().minus({ years: 1 }).toFormat(SERVER_DATE),
  // '2Y': DateTime.now().minus({ years: 2 }).toFormat(SERVER_DATE),
  // '5Y': DateTime.now().minus({ years: 5 }).toFormat(SERVER_DATE),
  // '10Y': DateTime.now().minus({ years: 10 }).toFormat(SERVER_DATE),
};

export type ChartTimespan = keyof typeof CHART_TIMESPANS;

export default CHART_TIMESPANS;
