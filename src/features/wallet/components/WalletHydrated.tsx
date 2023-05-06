'use client';

import { useMemo, useTransition } from 'react';

import dynamic from 'next/dynamic';

import SkeletonLoader from '@components/ui/SkeletonLoader';
import { TIMESPANS } from '@constants/timespans';
import { useDailyCurrencyRatesOverYearQuery } from '@src/api/client/CurrenctyRateClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@src/api/interfaces/ICurrencyRateApi';
import {
  useWalletActions,
  useWalletBaseCurrencies,
  useWalletQuoteCurrency,
  useWalletTimespan,
} from '@src/zustand/walletStore';

import WalletChartLoader from './loaders/WalletChartLoader';
import WalletCurrenciesSelectorsLoader from './loaders/WalletCurrenciesSelectorsLoader';
import useWalletQueryParamsUpdate from '../hooks/useWalletQueryParamsUpdate';

const TimespanPicker = dynamic(
  () => import('@components/misc/TimespanPicker'),
  {
    loading: () => (
      <SkeletonLoader className="h-24 w-[250px] max-w-full self-center" />
    ),
    ssr: false,
  },
);

const WalletCurrenciesSelectors = dynamic(
  () => import('./WalletCurrenciesSelectors'),
  {
    loading: () => <WalletCurrenciesSelectorsLoader />,
    ssr: false,
  },
);

const WalletChart = dynamic(() => import('./WalletChart'), {
  loading: () => <WalletChartLoader />,
  ssr: false,
});

const WalletHydrated = ({
  queryProps,
  ...props
}: {
  queryProps: PrefetchDailyCurrencyRatesRequest;
}) => {
  const [_, startCurrenciesTransition] = useTransition();
  const { setWalletTimespan } = useWalletActions();
  const walletQuoteCurrency = useWalletQuoteCurrency();
  const walletBaseCurrencies = useWalletBaseCurrencies();
  const timespan = useWalletTimespan();

  const baseCurrenciesNames = useMemo(
    () => walletBaseCurrencies.map((c) => c.name),
    [walletBaseCurrencies],
  );

  const query = useDailyCurrencyRatesOverYearQuery({
    ...queryProps,
    queryParams: {
      ...queryProps.queryParams,
      quote_currency: walletQuoteCurrency.name,
      base_currencies: baseCurrenciesNames,
      start_date: TIMESPANS[timespan],
    },
  });

  useWalletQueryParamsUpdate(startCurrenciesTransition);

  return (
    <div className="flex h-[65vh] w-full flex-col gap-y-6 lg:gap-y-8">
      <TimespanPicker active={timespan} onSelect={setWalletTimespan} />
      <WalletCurrenciesSelectors
        {...props}
        walletQuoteCurrency={walletQuoteCurrency}
        walletBaseCurrencies={walletBaseCurrencies}
      />
      <WalletChart
        {...query}
        walletQuoteCurrency={walletQuoteCurrency}
        walletBaseCurrencies={walletBaseCurrencies}
      />
    </div>
  );
};

export default WalletHydrated;
