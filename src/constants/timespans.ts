import { DateTime } from 'luxon';

import { Timespan } from '@interfaces/ICharts';

import { SERVER_DATE } from './dateTime';

const yearsTimespan = (years: number) =>
  DateTime.now().minus({ years }).plus({ days: 1 }).toFormat(SERVER_DATE);

export const TIMESPANS = {
  '1w': DateTime.now()
    .minus({ weeks: 1 })
    .plus({ days: 1 })
    .toFormat(SERVER_DATE),
  '1m': DateTime.now()
    .minus({ months: 1 })
    .plus({ days: 1 })
    .toFormat(SERVER_DATE),
  '1y': DateTime.now()
    .minus({ years: 1 })
    .plus({ days: 1 })
    .toFormat(SERVER_DATE),
  '2y': yearsTimespan(2),
  '5y': yearsTimespan(5),
  // '10y': yearsTimespan(10),
};
export const DEFAULT_TIMESPAN = '1y' satisfies Timespan;
