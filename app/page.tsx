import { Hydrate } from '@tanstack/react-query';
import { DateTime } from 'luxon';

import PageMaxWidth from '@components/misc/PageMaxWidth';
import PagePadding from '@components/misc/PagePadding';
import {
  DEFAULT_BASE_CURRENCIES,
  DEFAULT_QUOTE_CURRENCY,
} from '@constants/currencies';
import { SERVER_DATE } from '@constants/dateTime';
import HomepageHydrated from '@features/main/components/HomepageHydrated';
import LandingHeader from '@features/main/components/landingHeader';
import { prefetchDailyCurrencyRatesQuery } from '@src/api/CurrencyRateApi';
import {
  DailyCurrencyRatesRequest,
  PrefetchDailyCurrencyRatesRequest,
} from '@src/api/interfaces/ICurrencyRateApi';

const DATA_TIMESPAN = 30;
const QUERY_PROPS = {
  queryParams: {
    quote_currency: DEFAULT_QUOTE_CURRENCY,
    base_currencies: DEFAULT_BASE_CURRENCIES,
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
  const hydratedState = await prefetchDailyCurrencyRatesQuery(QUERY_PROPS);

  return (
    <Hydrate state={hydratedState}>
      <LandingHeader />
      <PageMaxWidth flex>
        <PagePadding flex vertical horizontal={false}>
          <HomepageHydrated
            queryProps={QUERY_PROPS}
            quoteCurrency={DEFAULT_QUOTE_CURRENCY}
            dataTimespan={DATA_TIMESPAN}
          />
        </PagePadding>
      </PageMaxWidth>
    </Hydrate>
  );
};

export default HomePage;
