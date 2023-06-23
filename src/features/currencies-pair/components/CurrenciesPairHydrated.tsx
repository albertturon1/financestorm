'use client';

import { useState, useTransition, useEffect, useRef } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { useDailyCurrencyRatesOverYearQuery } from '@api/client/CurrenctyRateClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@api/interfaces/ICurrencyRateApi';
import SkeletonLoader from '@components/ui/SkeletonLoader';
import { TIMESPANS } from '@constants/timespans';
import WalletChartLoader from '@features/wallet/components/loaders/WalletChartLoader';
import { useModifySearchParams } from '@hooks/useModifySearchParams';
import { Timespan } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import { ExchangeRateTimeseriesResponse } from '@interfaces/models/IExchangerate';

import CurrenciesPairConverter from './CurrenciesPairConverter';
import { useReplaceInvalidCurrenciesPairParams } from '../hooks/useReplaceInvalidCurrenciesPairParams';

const CurrenciesPairChart = dynamic(() => import('./CurrenciesPairChart'), {
  loading: () => <SkeletonLoader className="h-[45vh] w-full" />,
  ssr: false,
});
const TimespanPicker = dynamic(() => import('@components/timespanPicker'));

const CurrenciesPairHydrated = ({
  queryProps,
  ...props
}: {
  quoteCurrency: Currency;
  baseCurrency: Currency;
  queryProps: PrefetchDailyCurrencyRatesRequest;
  isValidTimespan: boolean;
  timespan: Timespan;
}) => {
  const router = useRouter();
  const [timespan, setTimespan] = useState<Timespan>(props.timespan);
  const [isPending, startCurrenciesTransition] = useTransition();

  useEffect(() => {
    setTimespan(props.timespan);
  }, [props.timespan]);

  const query = useDailyCurrencyRatesOverYearQuery({
    ...queryProps,
    queryParams: {
      ...queryProps.queryParams,
      start_date: TIMESPANS[timespan],
    },
  });

  const initialData = useRef<ExchangeRateTimeseriesResponse | undefined>(
    query.data,
  );

  const toQueryString = useModifySearchParams();
  useReplaceInvalidCurrenciesPairParams(props);
  return (
    <div className="flex flex-1 flex-col gap-y-6 lg:gap-y-10">
      <div className="flex flex-col gap-y-4 lg:gap-y-6">
        <TimespanPicker
          active={timespan}
          onSelect={(newTimespan) => {
            setTimespan(newTimespan);
            const newTimespanParam = toQueryString('timespan', newTimespan);

            startCurrenciesTransition(() => {
              void router.replace(`/wallet?${newTimespanParam}`, {
                forceOptimisticNavigation: true,
              });
            });
          }}
        />
        <div className="mt-5">
          {!isPending ? (
            <div className="h-[40vh] min-h-[400px] w-full">
              <CurrenciesPairChart {...query} {...props} />
            </div>
          ) : (
            <WalletChartLoader />
          )}
        </div>
      </div>
      <CurrenciesPairConverter {...props} rates={initialData.current?.rates} />
    </div>
  );
};

export default CurrenciesPairHydrated;
