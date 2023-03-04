import { DateTime } from 'luxon';

import { DateValue } from '@interfaces/ICharts';
import { cutNumber } from '@utils/misc';

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

const inflationSumPerMonth = (monthlyCPI: DateValue[]) => {
  const data: Record<string, MonthlyInflation> = {};

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
      monthCumulativeInflation: cutNumber(cumulativeInflation, 3),
      monthToMonthInflation: cutNumber(currentMonthInflation, 3),
      cpi: currentLoopCPIValue,
    };
  }
  return data;
};

const inflationWalletOverTimeValue = async (
  dailyWalletValues: WalletValueOverTime,
) => {
  const [year, month] = DateTime.fromISO(dailyWalletValues.startDate)
    .minus({ months: 1 })
    .toISODate()
    .split('-');
  const startPeriod = `${year}-${month}-01`; //data from previous month of start date is needed for calculations

  //TODO: ten endpoint wali błęy, choc data isnitnje
  const monthlyCPINormalize = await monthlyCPIData({
    startPeriod,
    endPeriod: dailyWalletValues.endDate,
  });
  // // const monthlyCPI = [...monthlyCPINormalize].reverse(); //reverse to start from most recent month

  // const inflationSums = inflationSumPerMonth(monthlyCPI);

  // console.log(JSON.stringify(inflationSums))

  // return dailyWalletValues.values.map(({ label, value }) => {
  //   const yearMonth = DateTime.fromISO(label).toFormat('yyyy-MM');
  //   const d: InflationWalletOverTimeValue = {
  //     label,
  //     baseValue: value,
  //     value,
  //     monthlyInflation: 0,
  //     cumulativeInflation: 0,
  //     inflationLoss: 0,
  //     cpi: -1,
  //   };

  //   if (!inflationSums[yearMonth]) return d;
  //   d.cumulativeInflation = cutNumber(
  //     inflationSums[yearMonth].monthCumulativeInflation,
  //   );
  //   d.monthlyInflation = cutNumber(
  //     inflationSums[yearMonth].monthToMonthInflation,
  //   );
  //   d.inflationLoss = cutNumber(value * (d.cumulativeInflation / 100));
  //   d.value = cutNumber(value - d.inflationLoss);
  //   d.baseValue = value;
  //   d.cpi = inflationSums[yearMonth].cpi;

  //   return d;
  // });
};

export default inflationWalletOverTimeValue;
