import { LabelValue } from '@interfaces/ICharts';
import {
  cutNumber,
  previousDate,
  serverDate,
  serverDateToParts,
} from '@utils/misc';

import monthlyCPIData from './monthlyCPIData';
import { WalletValueOverTime } from './walletValueOverTime';

export interface InflationWalletOverTimeValue extends LabelValue {
  cumulativeInflation: number;
  monthlyInflation: number;
  inflationLoss: number;
  baseValue: number;
  cpi: number;
}

interface MonthlyInflation {
  cumulative: number;
  monthly: number;
  cpi: number;
}

const daysInMonth = (month: number, year: number) =>
  new Date(year, month, 0).getDate();

//last to first months
const inflationFromCPI = (currentMonthCPI: number, pastMonthCPI: number) =>
  ((currentMonthCPI - pastMonthCPI) / pastMonthCPI) * 100;

const inflationSumPerMonth = (monthlyCPI: LabelValue[]) => {
  const data: Record<string, MonthlyInflation> = {};

  //i from 1 becuse 0 has already been used
  for (let i = 0; i < monthlyCPI.length - 1; i++) {
    const { label: currentLoopMonth, value: currentLoopCPIValue } =
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
      cumulative: cutNumber(cumulativeInflation, 3),
      monthly: cutNumber(currentMonthInflation, 3),
      cpi: currentLoopCPIValue,
    };
  }
  return data;
};

const inflationWalletOverTimeValue = async (
  dailyWalletValue: WalletValueOverTime,
) => {
  const startMonthMinusOneTimestamp = previousDate({
    date: new Date(dailyWalletValue.start_date),
    months: 1,
  });

  const dailyWalletStartMonth = serverDateToParts(
    serverDate(startMonthMinusOneTimestamp),
  );
  const dailyWalletEndMonth = serverDateToParts(dailyWalletValue.end_date);

  const monthlyCPINormalize = await monthlyCPIData({
    startPeriod: dailyWalletStartMonth,
    endPeriod: dailyWalletEndMonth,
  });
  const monthlyCPI = monthlyCPINormalize.reverse(); //reverse to start from most recent month

  const inflationSums = inflationSumPerMonth(monthlyCPI);

  return dailyWalletValue.rates.map(({ label, value }, index) => {
    const yearMonth = serverDateToParts(label);
    const year = serverDateToParts(label, 'year');
    const d: InflationWalletOverTimeValue = {
      label,
      value,
      baseValue: value,
      monthlyInflation: 0,
      cumulativeInflation: 0,
      inflationLoss: 0,
      cpi: -1,
    };

    const prevYearMonth = prevMonthDate(label);
    if (!inflationSums[yearMonth]) return d;

    const daysNumber = daysInMonth(
      Number(yearMonth.split('-')[1]),
      Number(year),
    );
    const day = Number(label.split('-')[2]);
    const multiplier = day / daysNumber;

    //if (inflationSums[prevYearMonth])
      //console.log(label, inflationSums[prevYearMonth]);

    d.cumulativeInflation = cutNumber(inflationSums[yearMonth].cumulative);
    d.monthlyInflation = cutNumber(inflationSums[yearMonth].monthly);
    d.inflationLoss = cutNumber(value * (d.cumulativeInflation / 100));
    d.value = cutNumber(value - d.inflationLoss);
    d.baseValue = value;
    d.cpi = inflationSums[yearMonth].cpi;

    return d;
  });
};

export const prevMonthDate = (date: string) => {
  const [year, month] = date.split('-');
  if (month === '01') return `${Number(year) - 1}-12`;

  const month1 = `${Number(month) - 1}`.padStart(2, '0');
  return `${year}-${month1}`;
};

//const chuj = (currentCumulative: number, prev) => {

export default inflationWalletOverTimeValue;
