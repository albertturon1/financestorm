'use client';

import dynamic from 'next/dynamic';

import CurrencyRatesList from '@components/currencyRatesList';
import NavigationButton from '@components/misc/NavigationButton';
import PagePadding from '@components/misc/PagePadding';
import PageTitle from '@components/misc/PageTitle';
import SkeletonLoader from '@components/ui/SkeletonLoader';
import { Currency } from '@interfaces/ICurrency';
import { useDailyCurrencyRatesQuery } from '@src/api/client/CurrenctyRateClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@src/api/interfaces/ICurrencyRateApi';

const MultiCurrenciesChart = dynamic(
  () => import('@components/multiCurrenciesChart'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[25vh] w-full items-center">
        <SkeletonLoader className="h-full w-full" />
      </div>
    ),
  },
);

const HomepageHydrated = ({
  queryProps,
  quoteCurrency,
  dataTimespan,
}: {
  queryProps: PrefetchDailyCurrencyRatesRequest;
  quoteCurrency: Currency;
  dataTimespan: number;
}) => {
  const query = useDailyCurrencyRatesQuery(queryProps);

  return (
    <div className="flex flex-col gap-y-10 lg:gap-y-20">
      <div className="flex flex-col gap-y-1">
        <PagePadding>
          <PageTitle title="Popular exchange rates" />
        </PagePadding>
        <CurrencyRatesList
          showGoToAllButton
          {...query}
          dataTimespan={dataTimespan}
        />
      </div>
      <PagePadding>
        <div className="flex h-[35vh] flex-col gap-y-1">
          <div className="flex items-center justify-between">
            <PageTitle title="Exchange rates comparisons" />
            <div className="mt-0.5 flex h-full flex-1 justify-end">
              <NavigationButton className="w-max" href={'/multi-currencies'}>
                {'More'}
              </NavigationButton>
            </div>
          </div>
          <MultiCurrenciesChart {...query} quoteCurrency={quoteCurrency} />
        </div>
      </PagePadding>
    </div>
  );
};

export default HomepageHydrated;
