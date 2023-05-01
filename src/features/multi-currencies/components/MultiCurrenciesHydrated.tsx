'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import SkeletonLoader from '@components/ui/SkeletonLoader';
import { CHART_TIMESPANS } from '@constants/chart';
import CurrenciesPairTimespanPicker from '@features/currencies-pair/components/CurrenciesPairTimespanPicker';
import { ChartTimespan } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import { useDailyCurrencyRatesQuery } from '@src/api/client/CurrenctyRateClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@src/api/interfaces/ICurrencyRateApi';

const MultiCurrenciesChart = dynamic(
  () => import('@components/multiCurrenciesChart'),
  {
    loading: () => <SkeletonLoader className="h-[55vh] w-full mt-5" />,
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
      start_date: CHART_TIMESPANS[timespan],
    },
  });

  return (
    <div className="flex w-full flex-col gap-y-2 h-[65vh]">
      <CurrenciesPairTimespanPicker active={timespan} onSelect={setTimespan} />
      <div className="flex flex-1">
        <MultiCurrenciesChart {...query} quoteCurrency={quoteCurrency} />
      </div>
    </div>
  );
};

export default MultiCurrenciesHydrated;
