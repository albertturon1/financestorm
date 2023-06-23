import { cutNumber } from '@utils/misc';

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
    Math.max(0, cutNumber(dataMin * 0.98, z)),
    cutNumber(dataMax * 1.02, z),
  ] satisfies [number, number];
}
