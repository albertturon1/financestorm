import { DateTime } from 'luxon';

export const xAxisIntervalDivider = ({screenWidth, itemsLength} : {screenWidth: number; itemsLength: number}) => {
  const sizes = [
    { size: 586, interval: 3 },
    { size: 768, interval: 6 },
    { size: 1024, interval: 8 },
    { size: 1280, interval: 10 },
    { size: 1536, interval: 14 },
  ];
  const z = sizes.find((s) => screenWidth < s.size);
  if (!z) return Math.ceil(itemsLength / 16);
  return Math.ceil(itemsLength / z.interval);
};

export const xAxisDateTickFormatter = (v: string) =>
  DateTime.fromISO(v).toFormat('d.LLL yy', {
    locale: 'pl',
  });

export function customLineChartYDomain(values: number[], multiplier = 5) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lower = min * (1 - multiplier / 100);
  const upper = max * (1 + multiplier / 100);
  return [lower, upper];
}
