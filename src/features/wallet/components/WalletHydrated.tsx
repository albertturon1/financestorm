'use client';

// import dynamic from 'next/dynamic';

import { CHART_TIMESPANS } from '@constants/chart';
import CurrenciesPairTimespanPicker from '@features/currencies-pair/components/CurrenciesPairTimespanPicker';
import { useDailyCurrencyRatesQuery } from '@src/api/client/CurrenctyRateClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@src/api/interfaces/ICurrencyRateApi';
import {
  useWalletActions,
  useWalletBaseCurrencies,
  useWalletQuoteCurrency,
  useWalletQuoteCurrencyName,
  useWalletTimespan,
} from '@src/zustand/walletStore';
import useWalletQueryParamsUpdate from '../hooks/useWalletQueryParamsUpdate';
import SkeletonLoader from '@components/ui/SkeletonLoader';
import WalletCurrenciesSelectors from './WalletCurrenciesSelectors';

// const WalletChart = dynamic(() => import('./WalletChart'), {
//   loading: () => <SkeletonLoader className="mt-5 h-[55vh] w-full" />,
//   ssr: false,
// });

const WalletHydrated = ({
  queryProps,
}: {
  queryProps: PrefetchDailyCurrencyRatesRequest;
}) => {
  const timespan = useWalletTimespan();
  const quoteWalletCurrency = useWalletQuoteCurrency();
  const baseWalletCurrencies = useWalletBaseCurrencies();

  const { setWalletTimespan } = useWalletActions();
  const query = useDailyCurrencyRatesQuery({
    ...queryProps,
    queryParams: {
      ...queryProps.queryParams,
      start_date: CHART_TIMESPANS[timespan],
    },
  });

  useWalletQueryParamsUpdate();

  return (
    <div className="flex h-[65vh] w-full flex-col gap-y-2">
      <CurrenciesPairTimespanPicker
        active={timespan}
        onSelect={setWalletTimespan}
      />
      <WalletCurrenciesSelectors
        baseWalletCurrencies={baseWalletCurrencies}
        quoteWalletCurrency={quoteWalletCurrency}
      />
    </div>
  );
};

export default WalletHydrated;
