'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import SkeletonLoader from '@components/ui/SkeletonLoader';
import { CHART_TIMESPANS } from '@constants/chart';
import { ChartTimespan } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import { useDailyCurrencyRatesQuery } from '@src/api/client/CurrenctyRateClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@src/api/interfaces/ICurrencyRateApi';

const CurrenciesPairChart = dynamic(() => import('./CurrenciesPairChart'), {
  loading: () => <SkeletonLoader className="h-[45vh] w-full" />,
  ssr: false,
});

import CurrenciesPairConverter from './CurrenciesPairConverter';
import CurrenciesPairTimespanPicker from './CurrenciesPairTimespanPicker';

const CurrenciesPairHydrated = ({
  defaultChartTimespan,
  queryProps,
  ...props
}: {
  quoteCurrency: Currency;
  baseCurrency: Currency;
  defaultChartTimespan: ChartTimespan;
  queryProps: PrefetchDailyCurrencyRatesRequest;
}) => {
  const [timespan, setTimespan] = useState<ChartTimespan>(defaultChartTimespan);

  const query = useDailyCurrencyRatesQuery({
    ...queryProps,
    queryParams: {
      ...queryProps.queryParams,
      start_date: CHART_TIMESPANS[timespan],
    },
  });

  return (
    <div className="flex flex-1 flex-col gap-y-6 lg:gap-y-10">
      <div className="flex flex-col gap-y-4 lg:gap-y-6">
        <CurrenciesPairTimespanPicker
          active={timespan}
          onSelect={setTimespan}
        />
        <CurrenciesPairChart {...query} {...props} />
      </div>
      <CurrenciesPairConverter {...props} rates={query.data?.rates} />
    </div>
  );
};

export default CurrenciesPairHydrated;
