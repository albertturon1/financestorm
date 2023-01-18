import { MonthlyWalletValue } from '@hooks/useGetWalletValueOverTime';
import { CountryMonthlyInflationRateResponse } from '@src/api/interfaces/IOECDApi';

const useMonthlyInflationData = (
  data: CountryMonthlyInflationRateResponse | undefined,
) => {
  const monthlyInflation: MonthlyWalletValue[] = [];
  if (!data) return monthlyInflation;
  const labels = data.structure.dimensions.observation[0].values;

  const observations = data.dataSets[0].series?.['0:0:0:0:0'].observations;

  const series = Object.values(observations).map((e) => e[0]);

  for (let i = 0; i < labels.length; i++) {
    monthlyInflation.push({
      label: labels[i].id,
      value: series[i],
    });
  }

  return monthlyInflation;
};

export default useMonthlyInflationData;
