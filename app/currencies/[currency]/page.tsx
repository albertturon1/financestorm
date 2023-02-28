import PageTitle from '@components/PageTitle';
import { CURRENCIES } from '@constants/currencies';
import { PADDING_TAILWIND } from '@constants/globals';
import CurrencyTile from '@features/currencies/compoonents/CurrencyTile';
import { Currencies } from '@interfaces/ICurrency';

import { getTodayCurrencyRatesQuery } from '../../../src/api/CurrenctyRateApi';

export type CurrenciesPageProps = { currency: Currencies };

const CurrenciesPage = async ({ params }: { params: CurrenciesPageProps }) => {
  const data = await getTodayCurrencyRatesQuery({
    base_currencies: CURRENCIES,
    quote_currency: params.currency,
  });

  return (
    <div className={`h-full w-full ${PADDING_TAILWIND}`}>
      <PageTitle>{`Dzisiejsze kursy walut w stosunku do ${params.currency}`}</PageTitle>
      <div className="grid auto-cols-max grid-cols-1 gap-5 pt-5 pb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {Object.entries(data.rates).map(([baseCurrency, rate]) => (
          <CurrencyTile
            baseCurrency={baseCurrency as Currencies}
            quoteCurrency={params.currency}
            rate={rate}
            key={baseCurrency}
          />
        ))}
      </div>
    </div>
  );
};

export default CurrenciesPage;
