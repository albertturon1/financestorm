'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import { useDailyCurrencyRatesOverYearQuery } from '@api/client/CurrenctyRateClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@api/interfaces/ICurrencyRateApi';
import SkeletonLoader from '@components/ui/SkeletonLoader';
import { TIMESPANS } from '@constants/timespans';
import { Timespan } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';

const CurrenciesPairChart = dynamic(() => import('./CurrenciesPairChart'), {
  loading: () => <SkeletonLoader className="h-[45vh] w-full" />,
  ssr: false,
});
const TimespanPicker = dynamic(() => import('@components/timespanPicker'));

import CurrenciesPairConverter from './CurrenciesPairConverter';

const CurrenciesPairHydrated = ({
  defaultChartTimespan,
  queryProps,
  ...props
}: {
  quoteCurrency: Currency;
  baseCurrency: Currency;
  defaultChartTimespan: Timespan;
  queryProps: PrefetchDailyCurrencyRatesRequest;
}) => {
  const [timespan, setTimespan] = useState<Timespan>(defaultChartTimespan);

  const query = useDailyCurrencyRatesOverYearQuery({
    ...queryProps,
    queryParams: {
      ...queryProps.queryParams,
      start_date: TIMESPANS[timespan],
    },
  });

  return (
    <div className="flex flex-1 flex-col gap-y-6 lg:gap-y-10">
      <div className="flex flex-col gap-y-4 lg:gap-y-6">
        <TimespanPicker active={timespan} onSelect={setTimespan} />
        <CurrenciesPairChart {...query} {...props} />
      </div>
      <CurrenciesPairConverter {...props} rates={query.data?.rates} />
    </div>
  );
};

export default CurrenciesPairHydrated;
