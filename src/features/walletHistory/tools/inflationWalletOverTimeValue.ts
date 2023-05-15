import { DateTime } from 'luxon';

import { DateValue } from '@interfaces/ICharts';
import { OECDResponse } from '@src/api/interfaces/IOECDApi';
import { cutNumber } from '@utils/misc';
import normalizeOECDData from '@utils/normalizeOECDData';

import monthlyCPIData from './monthlyCPIData';
import { WalletValueOverTime } from './walletValueOverTime';

export interface InflationWalletOverTimeValue extends DateValue {
  cumulativeInflation: number;
  monthlyInflation: number;
  inflationLoss: number;
  baseValue: number; //original value without inflation
  cpi: number;
}

interface MonthlyInflation {
  monthCumulativeInflation: number;
  monthToMonthInflation: number;
  cpi: number;
}

//last to first months
const inflationFromCPI = (currentMonthCPI: number, pastMonthCPI: number) =>
  ((currentMonthCPI - pastMonthCPI) / pastMonthCPI) * 100;

export const inflationSumPerMonth = (monthlyCPIValue: DateValue[]) => {
  const monthlyCPI = [...monthlyCPIValue].reverse();
  const data: Record<string, MonthlyInflation | undefined> = {};

  for (let i = 0; i < monthlyCPI.length - 1; i++) {
    const { date: currentLoopMonth, value: currentLoopCPIValue } =
      monthlyCPI[i];

    const { value: pastMonthLoopCPIValue } = monthlyCPI[i + 1];

    const currentMonthInflation = inflationFromCPI(
      currentLoopCPIValue,
      pastMonthLoopCPIValue,
    );

    const cumulativeInflation = inflationFromCPI(
      monthlyCPI[0].value,
      pastMonthLoopCPIValue, //you measure from start to currentMonth - 1
    );

    data[currentLoopMonth] = {
      monthCumulativeInflation: cutNumber(cumulativeInflation, 3),
      monthToMonthInflation: cutNumber(currentMonthInflation, 3),
      cpi: currentLoopCPIValue,
    };
  }
  return data;
};

const inflationWalletOverTimeValue = (
  dailyWalletValues: WalletValueOverTime,
  monthlyCPIValues: OECDResponse | undefined,
) => {
  if (!monthlyCPIValues) return;
  const monthlyCPINormalize = normalizeOECDData(monthlyCPIValues);

  const monthlyCPI = [...monthlyCPINormalize].reverse(); //reverse to start from most recent month
  if (!monthlyCPI.length) return [];

  const inflationSums = inflationSumPerMonth(monthlyCPI);

  return dailyWalletValues.values.map(({ date, value }) => {
    const yearMonth = DateTime.fromISO(date).toFormat('yyyy-MM');
    const d: InflationWalletOverTimeValue = {
      date,
      baseValue: value,
      value,
      monthlyInflation: 0,
      cumulativeInflation: 0,
      inflationLoss: 0,
      cpi: -1,
    };

    if (!inflationSums[yearMonth]) return d;
    d.cumulativeInflation = cutNumber(
      inflationSums[yearMonth].monthCumulativeInflation,
    );
    d.monthlyInflation = cutNumber(
      inflationSums[yearMonth].monthToMonthInflation,
    );
    d.inflationLoss = cutNumber(value * (d.cumulativeInflation / 100));
    d.value = cutNumber(value - d.inflationLoss);
    d.baseValue = value;
    d.cpi = inflationSums[yearMonth].cpi;

    return d;
  });
};

export default inflationWalletOverTimeValue;
