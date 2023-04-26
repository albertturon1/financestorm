'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import SkeletonLoader from '@components/SkeletonLoader';
import CHART_TIMESPANS, { ChartTimespan } from '@constants/chartTimespan';
import { Currency } from '@interfaces/ICurrency';
import { useDailyCurrencyRatesQuery } from '@src/api/client/CurrenctyRateClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@src/api/interfaces/ICurrenctyRateApi';

const CurrenciesPairChartAndConverter = dynamic(
  () => import('./CurrenciesPairChart'),
  {
    loading: () => <SkeletonLoader className="h-[60vh] w-full" />,
    ssr: false,
  },
);
const CurrenciesPairConverter = dynamic(
  () => import('./CurrenciesPairConverter'),
);
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
    <div className="flex w-full flex-1 flex-col gap-y-4 lg:gap-y-6">
      <CurrenciesPairTimespanPicker active={timespan} onSelect={setTimespan} />
      <CurrenciesPairChartAndConverter {...query} {...props} />
      <CurrenciesPairConverter {...props} rates={query.data?.rates} />
    </div>
  );
};

export default CurrenciesPairHydrated;
