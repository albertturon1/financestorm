import dynamic from 'next/dynamic';

import PageMaxWidth from '@components/PageMaxWidth';
import PagePadding from '@components/PagePadding';
import CurrenciesPairSelectors from '@features/currencies-pair/components/CurrenciesPairSelectors';
import { Currency, CurrenciesPair } from '@interfaces/ICurrency';

const CurrenciesBaseQuoteChart = dynamic(
  () =>
    import(
      '@features/currencies-pair/components/CurrenciesPairChartAndTimespan'
    ),
  {
    ssr: false,
  },
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
        <div className="flex w-full flex-1 flex-col gap-y-8">
          <CurrenciesPairSelectors
            baseCurrency={baseCurrency}
            quoteCurrency={quoteCurrency}
          />
          <CurrenciesBaseQuoteChart
            baseCurrency={baseCurrency}
            quoteCurrency={quoteCurrency}
          />
        </div>
      </PagePadding>
    </PageMaxWidth>
  );
};

export default CurrenciesPairPage;
