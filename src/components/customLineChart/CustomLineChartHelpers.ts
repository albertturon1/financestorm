import { DateTime } from 'luxon';

import { cutNumber } from '@utils/misc';

export const xAxisIntervalDivider = (width: number) => {
  const sizes = [
    { size: 586, interval: 3 },
    { size: 640, interval: 4 },
    { size: 768, interval: 6 },
    { size: 1024, interval: 8 },
    { size: 1280, interval: 10 },
    { size: 1536, interval: 14 },
  ];
  const z = sizes.find((s) => width < s.size);
  if (!z) return 16;
  return z.interval;
};

export const xAxisDateTickFormatter = (v: string) =>
  DateTime.fromISO(v).toFormat('d.LLL yy', {
    locale: 'pl',
  });

export const customLineChartYDomain = (
  values: number[],
  multiplier = 5, //in percent
  round = 2,
) => {
  const multi = multiplier / 100;

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const rMinValue = cutNumber(minValue - minValue * multi, round);
  const rMaxValue = cutNumber(
    Math.max(maxValue + maxValue * multi, 0.1),
    round,
  );
  return [rMinValue, rMaxValue];
};
