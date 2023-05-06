'use client';

import { useMemo } from 'react';

import dynamic from 'next/dynamic';

import TimespanPicker from '@components/misc/TimespanPicker';
import SkeletonLoader from '@components/ui/SkeletonLoader';
import { CHART_TIMESPANS } from '@constants/chart';
import { ChartTimespan } from '@interfaces/ICharts';
import { useDailyCurrencyRatesQuery } from '@src/api/client/CurrenctyRateClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@src/api/interfaces/ICurrencyRateApi';
import useWalletStore, {
  WalletCurrency,
  useWalletActions,
} from '@src/zustand/walletStore';

import useWalletQueryParamsUpdate from '../hooks/useWalletQueryParamsUpdate';

const WalletCurrenciesSelectors = dynamic(
  () => import('./WalletCurrenciesSelectors'),
  {
    loading: () => (
      <div className="flex w-full max-w-[300px] flex-col gap-y-2 self-center lg:text-lg">
        {Array.from(
          { length: useWalletStore.getState().baseCurrencies.length + 1 },
          (_, i) => (
            <SkeletonLoader
              key={i}
              className="h-10 w-full rounded-xl"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: '1s',
              }}
            />
          ),
        )}
      </div>
    ),
    ssr: false,
  },
);

const WalletChart = dynamic(() => import('./WalletChart'), {
  loading: () => <SkeletonLoader className="mt-5 h-[55vh] w-full" />,
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

  const query = useDailyCurrencyRatesQuery({
    ...queryProps,
    queryParams: {
      ...queryProps.queryParams,
      quote_currency: props.walletQuoteCurrency.name,
      base_currencies: baseCurrenciesNames,
      start_date: CHART_TIMESPANS[timespan],
    },
  });

  useWalletQueryParamsUpdate();

  return (
    <div className="flex h-[65vh] w-full flex-col gap-y-6 lg:gap-y-8">
      <TimespanPicker active={timespan} onSelect={setWalletTimespan} />
      <WalletCurrenciesSelectors {...props} />
      {/* <WalletChart
        {...query}
        quoteCurrency={props.walletQuoteCurrency.name}
        baseCurrencies={baseCurrenciesNames}
      /> */}
    </div>
  );
};

export default WalletHydrated;
