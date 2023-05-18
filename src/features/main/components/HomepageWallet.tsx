import { useMemo } from 'react';

import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';

import { useDailyCurrencyRatesOverYearQuery } from '@api/client/CurrenctyRateClientApi';
import { useMonthlyCPIQuery } from '@api/client/OECDClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@api/interfaces/ICurrencyRateApi';
import NavigationButton from '@components/misc/NavigationButton';
import PageTitle from '@components/misc/PageTitle';
import { OECD_COUNTRIES } from '@constants/currencies';
import { SERVER_DATE, YEAR_MONTH_FORMAT } from '@constants/dateTime';
import { TIMESPANS } from '@constants/timespans';
import WalletChartLoader from '@features/wallet/components/loaders/WalletChartLoader';
import { Timespan } from '@interfaces/ICharts';
import { WalletCurrency } from '@src/zustand/walletStore';

import HomepageWalletCurrencies from './HomepageWalletCurrencies';

const WalletChart = dynamic(
  () => import('@features/wallet/components/WalletChart'),
  {
    loading: () => <WalletChartLoader />,
    ssr: false,
  },
);

const TIMESPAN: Timespan = '1y';

const HomepageWallet = ({
  queryProps,
  walletBaseCurrencies,
  walletQuoteCurrency,
}: {
  queryProps: PrefetchDailyCurrencyRatesRequest;
  walletBaseCurrencies: WalletCurrency[];
  walletQuoteCurrency: WalletCurrency;
}) => {
  const startYearMonth = DateTime.fromISO(TIMESPANS[TIMESPAN])
    .minus({ months: 1 })
    .toFormat(YEAR_MONTH_FORMAT);

  const curerencyCountry = Object.entries(OECD_COUNTRIES).find(
    ([currency]) => currency === walletQuoteCurrency.name,
  );

  const monthlyCPIQuery = useMonthlyCPIQuery({
    startPeriod: `${startYearMonth}-01`, //fetching extra month
    endPeriod: DateTime.now().toFormat(SERVER_DATE),
    country: curerencyCountry?.[1], //possible undefined - not every currency has OECD data
  });

  const baseCurrenciesNames = useMemo(
    () => walletBaseCurrencies.map((c) => c.name),
    [walletBaseCurrencies],
  );

  const dailyCurrencyRatesOverYearQuery = useDailyCurrencyRatesOverYearQuery({
    ...queryProps,
    queryParams: {
      ...queryProps.queryParams,
      quote_currency: walletQuoteCurrency.name,
      base_currencies: baseCurrenciesNames,
      start_date: TIMESPANS[TIMESPAN],
    },
  });

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-col gap-y-2">
        <div className="flex h-min w-full flex-wrap items-center justify-between">
          <PageTitle title="Multicurrency wallet with inflation" />
          <NavigationButton href={'/wallet'} className="mt-0.5">
            {'More'}
          </NavigationButton>
        </div>
        <h1 className="max-w-full text-center text-sm font-medium">
          {'Currencies included in the wallet'}
        </h1>
        <HomepageWalletCurrencies
          walletCurrencies={[walletQuoteCurrency, ...walletBaseCurrencies]}
        />
      </div>
      <div className="h-[40vh] min-h-[400px]">
        <WalletChart
          showBrush={false}
          dailyCurrencyRatesOverYearQuery={dailyCurrencyRatesOverYearQuery}
          monthlyCPIQuery={monthlyCPIQuery}
          walletQuoteCurrency={walletQuoteCurrency}
          walletBaseCurrencies={walletBaseCurrencies}
          timespan={TIMESPAN}
        />
      </div>
    </div>
  );
};

export default HomepageWallet;
