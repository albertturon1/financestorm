import { DateValue } from '@interfaces/ICharts';
import { cutNumber } from '@utils/misc';

interface MonthlyInflation {
  monthCumulativeInflation: number;
  monthToMonthInflation: number;
  cpi: number;
}

const inflationFromCPI = (currentMonthCPI: number, pastMonthCPI: number) =>
  ((currentMonthCPI - pastMonthCPI) / pastMonthCPI) * 100;

export const getInflationStatsPerMonth = (monthlyCPIValue: DateValue[]) => {
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
