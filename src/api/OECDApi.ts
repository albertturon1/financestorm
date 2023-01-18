import { CountryMonthlyInflationRateResponse } from '@src/api/interfaces/IOECDApi';
import useFetch from '@utils/reactQuery/useFetch';

export const useMonthlyInflationRatesQuery = ({
  startPeriod,
  endPeriod,
}: {
  startPeriod: string;
  endPeriod: string;
}) =>
  useFetch<CountryMonthlyInflationRateResponse>({
    url: 'https://stats.oecd.org/sdmx-json/data/DP_LIVE/POL.CPI.TOT.AGRWTH.M/OECD?json-lang=pl&dimensionAtObservation=allDimensions',
    params: { startPeriod, endPeriod },
    key: ['a'],
    config: {
      staleTime: 600000,
    },
  });
