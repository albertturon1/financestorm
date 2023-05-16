import { useQuery } from '@tanstack/react-query';

import { OECDResponse, MonthlyCPIRequest } from '@src/api/interfaces/IOECDApi';
import api from '@utils/api';
import { genQueryString } from '@utils/misc';

import { OECD_KEYS } from '../queryKeys/OECDKeys';

export const getMonthlyCPI = async ({
  country,
  ...props
}: MonthlyCPIRequest) => {
  const url = `${
    process.env.NEXT_PUBLIC_OECD_URL ?? ''
  }/sdmx-json/data/DP_LIVE/${country.toUpperCase()}.CPI.TOT.IDX2015.M/OECD?json-lang=en&dimensionAtObservation=allDimensions`;

  const args = genQueryString(props);
  return await api.get<OECDResponse>(`${url}&${args}`);
};

export const useMonthlyCPIQuery = (props: MonthlyCPIRequest) =>
  useQuery({
    queryKey: OECD_KEYS.monthlyCPI(props),
    queryFn: () => getMonthlyCPI(props),
    staleTime: 1000 * 60 * 30,
  });
