import { DateTime } from 'luxon';

import { cutNumber } from '@utils/misc';

export const xAxisIntervalDivider = ({
  screenWidth,
  itemsLength,
}: {
  screenWidth: number;
  itemsLength: number;
}) => {
  const sizes = [
    { size: 375, interval: 3 },
    { size: 586, interval: 4 },
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

export function yAxisDomainFormatter(domain: [number, number]) {
  const [dataMin, dataMax] = domain;
  const t = [
    { size: 0.01, limiter: 5 },
    { size: 0.1, limiter: 4 },
    { size: 1, limiter: 3 },
  ];

  const z = t.find((s) => dataMin < s.size)?.limiter ?? 2;
  return [
    cutNumber(dataMin * 0.98, z),
    cutNumber(dataMax * 1.02, z),
  ] satisfies [number, number];
}

export function chartMarginLeft(minValue: number) {
  if (minValue < 0.01) return 5;
  if (minValue < 0.1) return 3;
  return -5;
}
