import { Hydrate } from '@tanstack/react-query';
import { DateTime } from 'luxon';

import { prefetchGetDailyCurrencyRatesQuery } from '@api/CurrencyRateApi';
import {
  DailyCurrencyRatesRequest,
  PrefetchDailyCurrencyRatesRequest,
} from '@api/interfaces/ICurrencyRateApi';
import PageMaxWidth from '@components/misc/PageMaxWidth';
import PagePadding from '@components/misc/PagePadding';
import {
  DEFAULT_WALLET_BASE_CURRENCIES,
  DEFAULT_WALLET_QUOTE_CURRENCY,
} from '@constants/currencies';
import { SERVER_DATE } from '@constants/dateTime';
import HomepageHydrated from '@features/main/components/HomepageHydrated';
import LandingHeader from '@features/main/components/landingHeader';

const WALLET_BASE_CURRENCIES = DEFAULT_WALLET_BASE_CURRENCIES;
const baseCurrenciesNames = WALLET_BASE_CURRENCIES.map((c) => c.name);

const DATA_TIMESPAN = 30;
const QUERY_PROPS = {
  queryParams: {
    quote_currency: DEFAULT_WALLET_QUOTE_CURRENCY.name,
    base_currencies: baseCurrenciesNames,
    start_date: DateTime.now()
      .minus({ days: DATA_TIMESPAN - 1 })
      .toFormat(SERVER_DATE),
    end_date: DateTime.now().toFormat(SERVER_DATE),
  } satisfies DailyCurrencyRatesRequest,
  queryOptions: {
    staleTime: 1000 * 60 * 60 * 24, //24hours
  },
} satisfies PrefetchDailyCurrencyRatesRequest;

const HomePage = async () => {
  const hydratedState = await prefetchGetDailyCurrencyRatesQuery(QUERY_PROPS);

  return (
    <Hydrate state={hydratedState}>
      <div className="flex flex-col gap-y-6">
        <LandingHeader />
        <PageMaxWidth flex>
          <PagePadding flex vertical horizontal={false}>
            <HomepageHydrated
              queryProps={QUERY_PROPS}
              walletQuoteCurrency={DEFAULT_WALLET_QUOTE_CURRENCY}
              walletBaseCurrencies={WALLET_BASE_CURRENCIES}
              dataTimespan={DATA_TIMESPAN}
            />
          </PagePadding>
        </PageMaxWidth>
      </div>
    </Hydrate>
  );
};

export default HomePage;
