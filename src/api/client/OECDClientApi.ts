import { useQuery } from '@tanstack/react-query';

import { OECDResponse, MonthlyCPIRequest } from '@api/interfaces/IOECDApi';
import { checkIsOECDFetchEnabledByTimespan } from '@features/wallet/components/WalletChart';
import { Timespan } from '@interfaces/ICharts';
import { OECDCountryCode } from '@interfaces/ICurrency';
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

export const useMonthlyCPIQuery = (
  props: Omit<MonthlyCPIRequest, 'country'> & {
    country: OECDCountryCode | undefined;
    timespan: Timespan;
  },
) =>
  useQuery({
    queryKey: OECD_KEYS.monthlyCPI({
      ...props,
      country: props.country as OECDCountryCode, //assertion because of "enabled"
    }),
    queryFn: () =>
      getMonthlyCPI({
        ...props,
        country: props.country as OECDCountryCode,
      }),
    staleTime: 1000 * 60 * 60 * 24, //24 hours
    enabled: !!props.country && checkIsOECDFetchEnabledByTimespan(props.timespan),
  });
