import { LabelValue } from '@interfaces/ICharts';
import {
  cutNumber,
  previousDate,
  serverDate,
  serverDateToParts,
} from '@utils/misc';

import monthlyCPIData from './monthlyCPIData';
import { WalletValueOverTime } from './walletValueOverTime';

export interface InflationWalletOverTimeValue {
  label: string;
  value: number;
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

//last to first months
const inflationFromCPI = (currentMonthCPI: number, pastMonthCPI: number) =>
  ((currentMonthCPI - pastMonthCPI) / pastMonthCPI) * 100;

const inflationSumPerMonth = (
  monthlyCPI: LabelValue[],
  walletStartMonth: string,
) => {
  const [startingMonth, nextToStartMonth] = monthlyCPI;

  const startingValue = inflationFromCPI(
    startingMonth.value,
    nextToStartMonth.value,
  );

  const data: Record<string, MonthlyInflation> = {
    [startingMonth.label]: {
      monthly: startingValue,
      cumulative: startingValue, //first month has no cumulation
      cpi: startingMonth.value,
    },
  };

  //i from 1 becuse 0 has already been used
  for (let i = 1; i < monthlyCPI.length - 1; i++) {
    const { label: currentLoopMonth, value: currentLoopCPIValue } =
      monthlyCPI[i];

    if (currentLoopMonth < walletStartMonth) return data; //last month has already been calculated
    const { value: pastMonthLoopCPIValue } = monthlyCPI[i + 1];

    const currentMonthInflation = inflationFromCPI(
      currentLoopCPIValue,
      pastMonthLoopCPIValue,
    );

    const cumulativeInflation = inflationFromCPI(
      startingMonth.value,
      pastMonthLoopCPIValue, //you measure from start to currentMonth - 1
    );

    data[currentLoopMonth] = {
      cumulative: cumulativeInflation,
      monthly: currentMonthInflation,
      cpi: currentLoopCPIValue,
    };
  }
  return data;
};

const inflationWalletOverTimeValue = async (
  dailyWalletValue: WalletValueOverTime,
) => {
  const startMonthMinusOneTimestamp = previousDate(
    new Date(dailyWalletValue.start_date),
    undefined,
    1,
  );

  const dailyWalletStartMonth = serverDateToParts(
    serverDate(startMonthMinusOneTimestamp),
  );
  const dailyWalletEndMonth = serverDateToParts(dailyWalletValue.end_date);

  const monthlyCPINormalize = await monthlyCPIData({
    startPeriod: dailyWalletStartMonth,
    endPeriod: dailyWalletEndMonth,
  });

  const monthlyCPI = monthlyCPINormalize.reverse(); //reverse to start from most recent month

  const inflationSums = inflationSumPerMonth(
    monthlyCPI,
    serverDateToParts(dailyWalletValue.start_date, 'month'),
  );

  return dailyWalletValue.rates.map(({ label, value }) => {
    const month = serverDateToParts(label);
    const d: InflationWalletOverTimeValue = {
      label,
      value,
      baseValue: value,
      monthlyInflation: 0,
      cumulativeInflation: 0,
      inflationLoss: 0,
      cpi: -1,
    };

    if (!inflationSums[month]) return d;

    d.cumulativeInflation = cutNumber(inflationSums[month].cumulative);
    d.monthlyInflation = cutNumber(inflationSums[month].monthly);
    d.inflationLoss = cutNumber(value * (d.cumulativeInflation / 100));
    d.value = cutNumber(value - d.inflationLoss);
    d.baseValue = value;
    d.cpi = inflationSums[month].cpi;

    return d;
  });
};

export default inflationWalletOverTimeValue;
