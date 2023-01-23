import { LabelValue } from '@interfaces/ICharts';
import { cutNumber, serverDateToParts } from '@utils/misc';

import monthlyInflationData from './monthlyInflationData';
import { WalletValueOverTime } from './walletValueOverTime';

export interface InflationWalletOverTimeValue {
  label: string;
  value: number;
  inflationPercentage: number;
  inflationLoss: number;
  baseValue: number;
}
const inflationSumPerMonth = (monthlyInflation: LabelValue[]) => {
  const data: Record<string, number> = {
    [monthlyInflation[0].label]: cutNumber(monthlyInflation[0].value / 12, 4),
  };

  for (let i = 0; i < monthlyInflation.length - 1; i++) {
    const yearMonth = monthlyInflation[i + 1].label
      .split('-')
      .slice(0, 2)
      .join('-');
    const prevYearMonth = monthlyInflation[i].label;
    const currentMonthInflation = monthlyInflation[i + 1].value / 12;
    const prevMonthSum = data[prevYearMonth];

    data[yearMonth] = cutNumber(prevMonthSum + currentMonthInflation, 2);
  }
  return data;
};

const inflationWalletOverTimeValue = async (
  dailyWalletValue: WalletValueOverTime,
) => {
  const dailyWalletStartMonth = serverDateToParts(dailyWalletValue.start_date);
  const dailyWalletEndMonth = serverDateToParts(dailyWalletValue.end_date);

  const monthlyInflationNormalized = await monthlyInflationData({
    startPeriod: dailyWalletStartMonth,
    endPeriod: dailyWalletEndMonth,
  });
  const monthlyInflation = monthlyInflationNormalized.reverse(); //reverse to start from most recent month
  const inflationSums = inflationSumPerMonth(monthlyInflation);

  //const [inflationSumsStartMonth] = Object.keys(inflationSums).slice(-1);
  //const [inflationSumsEndMonth] = Object.keys(inflationSums);

  //const startMonth =
  //  dailyWalletStartMonth < inflationSumsStartMonth
  //    ? dailyWalletStartMonth
  //    : inflationSumsStartMonth;

  //const endMonth =
  //  dailyWalletEndMonth < inflationSumsEndMonth
  //    ? dailyWalletEndMonth
  //    : inflationSumsEndMonth;

  return dailyWalletValue.rates.map(({ label, value }) => {
    const month = serverDateToParts(label);
    const d: InflationWalletOverTimeValue = {
      label,
      value,
      baseValue: value,
      inflationPercentage: 0,
      inflationLoss: 0,
    };

    if (!inflationSums[month]) return d;

    d.inflationPercentage = inflationSums[month];
    d.inflationLoss = cutNumber(value * (d.inflationPercentage / 100), 2);
    d.value = cutNumber(value - d.inflationLoss, 2);
    d.baseValue = value;

    return d;
  });
};

export default inflationWalletOverTimeValue;
