'use client';

import dynamic from 'next/dynamic';

import { useDailyCurrencyRatesQuery } from '@api/client/CurrenctyRateClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@api/interfaces/ICurrencyRateApi';
import CurrencyRatesListSkeletonLoader from '@components/currencyRatesList/CurrencyRatesListSkeletonLoader';
import PagePadding from '@components/misc/PagePadding';
import PageTitle from '@components/misc/PageTitle';
import { WalletCurrency } from '@src/zustand/walletStore';

import HomepageMultiCurrencies from './HomepageMultiCurrencies';

const HomepageWallet = dynamic(() => import('./HomepageWallet'));
const CurrencyRatesList = dynamic(
  () => import('@components/currencyRatesList'),
  {
    loading: () => <CurrencyRatesListSkeletonLoader />,
  },
);

const HomepageHydrated = ({
  queryProps,
  dataTimespan,
  ...props
}: {
  queryProps: PrefetchDailyCurrencyRatesRequest;
  walletQuoteCurrency: WalletCurrency;
  walletBaseCurrencies: WalletCurrency[];
  dataTimespan: number;
}) => {
  const dailyCurrencyRatesQuery = useDailyCurrencyRatesQuery(queryProps);

  return (
    <div className="flex flex-col gap-y-10 lg:gap-y-16">
      <div className="flex flex-col gap-y-1">
        <PagePadding>
          <PageTitle title="Popular exchange rates" />
        </PagePadding>
        <CurrencyRatesList
          showGoToAllButton
          dailyCurrencyRatesQuery={dailyCurrencyRatesQuery}
          dataTimespan={dataTimespan}
        />
      </div>
      <PagePadding>
        <div className="flex flex-col gap-y-10 lg:gap-y-16">
          <HomepageWallet
            queryProps={queryProps}
            {...props}
            walletBaseCurrencies={props.walletBaseCurrencies.slice(0, 2)}
          />
          <HomepageMultiCurrencies
            dailyCurrencyRatesQuery={dailyCurrencyRatesQuery}
            {...props}
            quoteCurrency={props.walletQuoteCurrency.name}
          />
        </div>
      </PagePadding>
    </div>
  );
};

export default HomepageHydrated;
