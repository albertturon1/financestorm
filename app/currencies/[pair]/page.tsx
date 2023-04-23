import dynamic from 'next/dynamic';

import PageMaxWidth from '@components/PageMaxWidth';
import PagePadding from '@components/PagePadding';
import { Currency, CurrenciesPair } from '@interfaces/ICurrency';

const CurrenciesBaseQuoteChart = dynamic(
  () => import('@features/currencies/compoonents/CurrenciesBaseQuoteChart'),
);

export type CurrenciesPairPageProps = {
  pair: CurrenciesPair;
};

const CurrenciesPairPage = ({
  params,
}: {
  params: CurrenciesPairPageProps;
}) => {
  const [baseCurrency, quoteCurrency] = (params.pair as string).split('-') as [
    Currency,
    Currency,
  ];

  return (
    <PageMaxWidth flex>
      <PagePadding vertical flex>
        <CurrenciesBaseQuoteChart
          baseCurrency={baseCurrency}
          quoteCurrency={quoteCurrency}
        />
      </PagePadding>
    </PageMaxWidth>
  );
};

export default CurrenciesPairPage;
