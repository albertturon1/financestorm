import dynamic from 'next/dynamic';

import NavigationButton from '@components/misc/NavigationButton';
import PageTitle from '@components/misc/PageTitle';
import { DataLoaderQueryProps } from '@components/ui/DataLoader';
import SkeletonLoader from '@components/ui/SkeletonLoader';
import { Currency } from '@interfaces/ICurrency';
import { ExchangeRateTimeseriesResponse } from '@interfaces/models/IExchangerate';

const MultiCurrenciesChart = dynamic(
  () => import('@components/multiCurrenciesChart'),
  {
    ssr: false,
    loading: () => (
      <div className="mt-4 flex h-[350px] max-h-[37vh] w-full items-center">
        <SkeletonLoader className="h-full w-full" />
      </div>
    ),
  },
);

const HomepageMultiCurrencies = ({
  quoteCurrency,
  dailyCurrencyRatesQuery,
}: {
  quoteCurrency: Currency;
  dailyCurrencyRatesQuery: DataLoaderQueryProps<
    ExchangeRateTimeseriesResponse | undefined
  >;
}) => (
  <div className="flex h-[400px] max-h-[40vh] flex-col gap-y-1">
    <div className="flex h-min w-full flex-wrap items-center justify-between">
      <PageTitle title="Exchange rates comparisons" />
      <NavigationButton href={'/multi-currencies'} className="mt-0.5">
        {'More'}
      </NavigationButton>
    </div>
    <MultiCurrenciesChart
      {...dailyCurrencyRatesQuery}
      quoteCurrency={quoteCurrency}
    />
  </div>
);

export default HomepageMultiCurrencies;
