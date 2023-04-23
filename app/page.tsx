import dynamic from 'next/dynamic';

import PageMaxWidth from '@components/PageMaxWidth';
import PagePadding from '@components/PagePadding';
import PopularCurrencyRatesLoader from '@components/PopularCurrencyRates/PopularCurrencyRatesLoader';

const PopularCurrencyRates = dynamic(
  () => import('@components/PopularCurrencyRates'),
  {
    loading: () => <PopularCurrencyRatesLoader />,
  },
);

const HomePage = () => (
  <PageMaxWidth>
    <PagePadding vertical horizontal={false}>
      <PopularCurrencyRates />
    </PagePadding>
  </PageMaxWidth>
);

export default HomePage;
