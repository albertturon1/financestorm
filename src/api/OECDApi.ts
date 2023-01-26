import {
  OECDResponse,
  MonthlyInflationRatesRequest,
} from '@src/api/interfaces/IOECDApi';
import api from '@utils/api';
import { genQueryString } from '@utils/misc';

export const getMonthlyInflationRates = async (
  props: MonthlyInflationRatesRequest,
) => {
  const url =
    'https://stats.oecd.org/sdmx-json/data/DP_LIVE/POL.CPI.TOT.AGRWTH.M/OECD?json-lang=pl&dimensionAtObservation=allDimensions';

  const args = genQueryString(props);
  return await api.get<OECDResponse>(`${url}&${args}`);
};

export const getMonthlyCPI = async (props: MonthlyInflationRatesRequest) => {
  const url =
    'https://stats.oecd.org/sdmx-json/data/DP_LIVE/POL.CPI.TOT.IDX2015.M/OECD?json-lang=pl&dimensionAtObservation=allDimensions';

  const args = genQueryString(props);
  return await api.get<OECDResponse>(`${url}&${args}`);
};
