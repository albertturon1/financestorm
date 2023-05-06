'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import TimespanPicker from '@components/misc/TimespanPicker';
import SkeletonLoader from '@components/ui/SkeletonLoader';
import { TIMESPANS } from '@constants/timespans';
import { ChartTimespan } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import { useDailyCurrencyRatesQuery } from '@src/api/client/CurrenctyRateClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@src/api/interfaces/ICurrencyRateApi';

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
  dataTimespan,
}: {
  queryProps: PrefetchDailyCurrencyRatesRequest;
  quoteCurrency: Currency;
  dataTimespan: ChartTimespan;
}) => {
  const [timespan, setTimespan] = useState<ChartTimespan>(dataTimespan);
  const query = useDailyCurrencyRatesQuery({
    ...queryProps,
    queryParams: {
      ...queryProps.queryParams,
      start_date: TIMESPANS[timespan],
    },
  });

  return (
    <div className="flex h-[65vh] w-full flex-col gap-y-2">
      <TimespanPicker active={timespan} onSelect={setTimespan} />
      <div className="flex flex-1">
        <MultiCurrenciesChart {...query} quoteCurrency={quoteCurrency} />
      </div>
    </div>
  );
};

export default MultiCurrenciesHydrated;
