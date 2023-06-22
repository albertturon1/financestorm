'use client';

import { useCallback, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

import { useDailyCurrencyRatesOverYearQuery } from '@api/client/CurrenctyRateClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@api/interfaces/ICurrencyRateApi';
import TimespanPicker from '@components/timespanPicker';
import SkeletonLoader from '@components/ui/SkeletonLoader';
import { TIMESPANS } from '@constants/timespans';
import { Timespan } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import { createQueryString } from '@utils/misc';

import { useReplaceInvalidMultiCurrenciesParams } from '../hooks/useReplaceInvalidMultiCurrenciesParams';

const MultiCurrenciesChart = dynamic(
  () => import('@components/multiCurrenciesChart'),
  {
    loading: () => <SkeletonLoader className="mt-5 h-[55vh] w-full" />,
    ssr: false,
  },
);

const MultiCurrenciesHydrated = ({
  queryProps,
  quoteCurrency,
  ...props
}: {
  queryProps: PrefetchDailyCurrencyRatesRequest;
  quoteCurrency: Currency;
  isValidQuoteCurrencyFromParams: boolean;
  isValidBaseCurrenciesFromParams: boolean;
  isValidTimespan: boolean;
  timespan: Timespan;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [timespan, setTimespan] = useState<Timespan>(props.timespan);

  //useState for faster UI transition of TimespanPicker
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

  const toQueryString = useCallback(
    (param: string, value: string) =>
      createQueryString({ param, value, searchParams }),
    [searchParams],
  );

  useReplaceInvalidMultiCurrenciesParams(props);
  return (
    <div className="flex h-[65vh] w-full flex-col gap-y-2">
      <TimespanPicker
        active={timespan}
        onSelect={(newTimespan) => {
          setTimespan(newTimespan);
          const newTimespanParam = toQueryString('timespan', newTimespan);

          void router.replace(`/multi-currencies?${newTimespanParam}`, {
            forceOptimisticNavigation: true,
          });
        }}
      />
      <div className="flex flex-1">
        <MultiCurrenciesChart {...query} quoteCurrency={quoteCurrency} />
      </div>
    </div>
  );
};

export default MultiCurrenciesHydrated;
