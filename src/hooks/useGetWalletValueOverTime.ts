import {
  CurrenciesPairs,
  CurrencyResponse,
} from '@features/main/hooks/useCurrentCurrencyRatesData';
import { CurrencyRateData } from '@src/api/interfaces/ICurrenctyRateApi';
import { roundNumber } from '@utils/misc';
import { User } from 'app/user/[id]/page';

type MonthlyCurrency = CurrencyRateData[] | undefined;

export interface MonthlyWalletValue {
  label: string;
  value: number;
  eur_value: number;
  eur_rate: number;
  gbp_value: number;
  gbp_rate: number;
  usd_value: number;
  usd_rate: number;
  chf_value: number;
  chf_rate: number;
  pln_value: number;
}

export const getDailyWalletValue = (
  user: User,
  currencyRates: CurrenciesPairs,
) => {
  let sum = 0;
  for (const [key, value] of Object.entries(currencyRates)) {
    const [_, currency] = key.split('_');
    const currencyVolume = user[currency] as number;

    const currentExchangeRate =
      (value as CurrencyResponse)?.present.exchange_rate ?? 0;

    const currencyInBase = currencyVolume * currentExchangeRate;

    sum += currencyInBase;
    return sum;
  }
};

const useGetWalletValueOverTime = ({
  user,
  gbp,
  chf,
  usd,
  eur,
  monthlyInflationNormalized,
}: {
  user: User | undefined;
  gbp: MonthlyCurrency;
  chf: MonthlyCurrency;
  usd: MonthlyCurrency;
  eur: MonthlyCurrency;
  monthlyInflationNormalized: MonthlyWalletValue[];
}) => {
  const walletValue: MonthlyWalletValue[] = [];
  if (
    !user ||
    !gbp ||
    !eur ||
    !usd ||
    !chf ||
    !monthlyInflationNormalized.length
  )
    return walletValue;

  const startMonths = [
    gbp[0].label,
    usd[0].label,
    chf[0].label,
    eur[0].label,
    monthlyInflationNormalized[0].label,
  ];
  const endMonths = [
    gbp.slice(-1)[0].label,
    usd.slice(-1)[0].label,
    chf.slice(-1)[0].label,
    eur.slice(-1)[0].label,
    monthlyInflationNormalized.slice(-1)[0].label,
  ];
  const [startMonth] = startMonths.sort().reverse();
  const [endMonth] = endMonths.sort();

  const filterMonths = (currency: CurrencyRateData[]) =>
    currency
      .filter(({ label }) => label > startMonth && label < endMonth)
      .reverse();

  const gbp_filter = filterMonths(gbp);
  const usd_filter = filterMonths(usd);
  const chf_filter = filterMonths(chf);
  const eur_filter = filterMonths(eur);
  //const inflation_filter = filterMonths(monthlyInflationNormalized);

  const monthsAmount = Math.min(
    gbp_filter.length,
    usd_filter.length,
    chf_filter.length,
    chf_filter.length,
  );

  for (let i = 0; i < monthsAmount; i++) {
    let monthSum = 0;
    const gbp_rate = gbp_filter[i].close;
    const usd_rate = usd_filter[i].close;
    const eur_rate = eur_filter[i].close;
    const chf_rate = chf_filter[i].close;

    const gbp_value = roundNumber(gbp_filter[i].close * user.gbp, 2);
    const usd_value = roundNumber(usd_filter[i].close * user.usd, 2);
    const eur_value = roundNumber(eur_rate * user.eur, 2);
    const chf_value = roundNumber(chf_rate * user.chf, 2);
    const sum = gbp_value + usd_value + eur_value + chf_value + user.pln;
    monthSum = roundNumber(sum, 2);

    walletValue.push({
      label: gbp_filter[i].label,
      value: monthSum,
      eur_value,
      gbp_value,
      chf_value,
      usd_value,
      eur_rate,
      gbp_rate,
      usd_rate,
      chf_rate,
      pln_value: user.pln,
      ...user,
    });
  }

  return walletValue.reverse();
};

export default useGetWalletValueOverTime;
