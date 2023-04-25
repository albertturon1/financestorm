import dynamic from 'next/dynamic';

import CurrencyRatesListSkeletonLoader from '@components/currencyRatesList/CurrencyRatesListSkeletonLoader';
import PageMaxWidth from '@components/PageMaxWidth';
import PagePadding from '@components/PagePadding';

const CurrencyRatesList = dynamic(
  () => import('@components/currencyRatesList'),
  {
    loading: () => <CurrencyRatesListSkeletonLoader />,
    ssr: false
  },
);

const HomePage = () => (
  <PageMaxWidth>
    <PagePadding vertical horizontal={false}>
      <CurrencyRatesList showGoToAllButton />
    </PagePadding>
  </PageMaxWidth>
);

export default HomePage;
