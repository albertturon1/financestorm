'use client';

import { useMemo, useTransition } from 'react';

import dynamic from 'next/dynamic';

import TimespanPicker from '@components/misc/TimespanPicker';
import { TIMESPANS } from '@constants/timespans';
import { ChartTimespan } from '@interfaces/ICharts';
import { useDailyCurrencyRatesOverYearQuery } from '@src/api/client/CurrenctyRateClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@src/api/interfaces/ICurrencyRateApi';
import { WalletCurrency, useWalletActions } from '@src/zustand/walletStore';

import WalletChartLoader from './loaders/WalletChartLoader';
import WalletCurrenciesSelectorsLoader from './loaders/WalletCurrenciesSelectorsLoader';
import useWalletQueryParamsUpdate from '../hooks/useWalletQueryParamsUpdate';

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
  timespan,
  ...props
}: {
  queryProps: PrefetchDailyCurrencyRatesRequest;
  timespan: ChartTimespan;
  walletQuoteCurrency: WalletCurrency;
  walletBaseCurrencies: WalletCurrency[];
}) => {
  const { setWalletTimespan } = useWalletActions();

  const baseCurrenciesNames = useMemo(
    () => props.walletBaseCurrencies.map((c) => c.name),
    [props.walletBaseCurrencies],
  );

  const query = useDailyCurrencyRatesOverYearQuery({
    ...queryProps,
    queryParams: {
      ...queryProps.queryParams,
      quote_currency: props.walletQuoteCurrency.name,
      base_currencies: baseCurrenciesNames,
      start_date: TIMESPANS[timespan],
    },
  });

  useWalletQueryParamsUpdate();
  const [isCurrenciesPending, startCurrenciesTransition] = useTransition();

  return (
    <div className="flex h-[65vh] w-full flex-col gap-y-6 lg:gap-y-8">
      <TimespanPicker active={timespan} onSelect={setWalletTimespan} />
      <WalletCurrenciesSelectors
        {...props}
        startCurrenciesTransition={startCurrenciesTransition}
      />
      {!isCurrenciesPending ? (
        <WalletChart {...query} {...props} />
      ) : (
        <WalletChartLoader />
      )}
    </div>
  );
};

export default WalletHydrated;
