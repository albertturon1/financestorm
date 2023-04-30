import { Hydrate } from '@tanstack/react-query';

import PageMaxWidth from '@components/misc/PageMaxWidth';
import PagePadding from '@components/misc/PagePadding';
import SectionTitle from '@components/misc/SectionTitle';
import { CURRENCIES } from '@constants/currencies';
import CurrenciesHydrated from '@features/currencies/components/CurrenciesHydrated';
import { Currency } from '@interfaces/ICurrency';
import { prefetchTodayCurrencyRatesQuery } from '@src/api/CurrencyRateApi';
import {
  MultiCurrenciesRate,
  PrefetchTodayCurrencyRatesRequest,
} from '@src/api/interfaces/ICurrencyRateApi';

export type CurrenciesPageProps = { default_currency?: Currency };

const CurrenciesPage = async ({
  searchParams,
}: {
  searchParams: CurrenciesPageProps;
}) => {
  const defaultQuoteCurrency = searchParams.default_currency ?? 'PLN';
  const baseCurrencies = CURRENCIES.filter((c) => c !== defaultQuoteCurrency);

  const QUERY_PROPS = {
    queryParams: {
      quote_currency: defaultQuoteCurrency,
      base_currencies: baseCurrencies,
    } satisfies MultiCurrenciesRate,
    queryOptions: {
      staleTime: 1000 * 60 * 60 * 24, //24hour
    },
  } satisfies PrefetchTodayCurrencyRatesRequest;

  const hydratedState = await prefetchTodayCurrencyRatesQuery(QUERY_PROPS);

  return (
    <Hydrate state={hydratedState}>
      <PageMaxWidth flex>
        <PagePadding flex vertical>
          <div className="flex flex-1 flex-col gap-y-6">
            {/* <SectionTitle>{'All currency pairs'}</SectionTitle> */}
            <CurrenciesHydrated
              queryProps={QUERY_PROPS}
              defaultCurrency={defaultQuoteCurrency}
              baseCurrencies={baseCurrencies}
            />
          </div>
        </PagePadding>
      </PageMaxWidth>
    </Hydrate>
  );
};

export default CurrenciesPage;
