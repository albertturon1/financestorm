import { Hydrate } from '@tanstack/react-query';
import { DateTime } from 'luxon';

import { prefetchGetDailyCurrencyRatesOverYearQuery } from '@api/CurrencyRateApi';
import {
  DailyCurrencyRatesRequest,
  PrefetchDailyCurrencyRatesRequest,
} from '@api/interfaces/ICurrencyRateApi';
import PageMaxWidth from '@components/misc/PageMaxWidth';
import PagePadding from '@components/misc/PagePadding';
import PageTitle from '@components/misc/PageTitle';
import { DEFAULT_WALLET_QUOTE_CURRENCY } from '@constants/currencies';
import { SERVER_DATE } from '@constants/dateTime';
import { DEFAULT_TIMESPAN, TIMESPANS } from '@constants/timespans';
import WalletHydrated from '@features/wallet/components/WalletHydrated';
import { getWalletCurrencyFromString } from '@features/wallet/tools/walletCurrencyFromString';
import { Timespan } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import { WalletCurrency } from '@src/zustand/walletStore';
import { baseCurrenciesWithAmountFromQuery } from '@utils/misc';

export type WalletPageProps = {
  quote?: Currency;
  base?: string;
  timespan?: Timespan;
};

const WalletPage = async ({
  searchParams,
}: {
  searchParams: WalletPageProps;
}) => {
  const { quote, base, timespan: queryTimespan } = searchParams;

  const isValidQuoteCurrency = !!getWalletCurrencyFromString(quote);
  const walletCurrencyFromString = getWalletCurrencyFromString(quote);
  const walletQuoteCurrency =
    walletCurrencyFromString ?? DEFAULT_WALLET_QUOTE_CURRENCY;

  const baseCurrenciesFromString = baseCurrenciesWithAmountFromQuery(
    base,
    walletQuoteCurrency.name,
  );
  const currenciesFromQuery: Currency[] = [];

  //might have length 0
  const walletBaseCurrencies = baseCurrenciesFromString
    .map((c) => getWalletCurrencyFromString(c))
    .filter(Boolean) //might return undefined
    .reduce((acc, item) => {
      if (currenciesFromQuery.includes(item.name)) return acc; //checking if the currency is not repeated
      acc.push(item);
      currenciesFromQuery.push(item.name);
      return acc;
    }, [] as WalletCurrency[]);

  const isValidBaseCurrencies = !!walletBaseCurrencies.length;

  const walletBaseCurrenciesNames = walletBaseCurrencies.map((c) => c.name);

  const isValidTimespan =
    !!queryTimespan && !!Object.keys(TIMESPANS).includes(queryTimespan);

  const timespan = isValidTimespan ? queryTimespan : DEFAULT_TIMESPAN;

  const QUERY_PROPS = {
    queryParams: {
      quote_currency: walletQuoteCurrency.name,
      base_currencies: walletBaseCurrenciesNames,
      start_date: TIMESPANS[timespan],
      end_date: DateTime.now().toFormat(SERVER_DATE),
    } satisfies DailyCurrencyRatesRequest,
    queryOptions: {
      staleTime: 1000 * 60 * 30, //30minutes
    },
  } satisfies PrefetchDailyCurrencyRatesRequest;

  const hydratedState = await prefetchGetDailyCurrencyRatesOverYearQuery(
    QUERY_PROPS,
  );

  return (
    <Hydrate state={hydratedState}>
      <PageMaxWidth>
        <PagePadding vertical>
          <div className="flex w-full flex-1 flex-col gap-y-6 lg:gap-y-8">
            <PageTitle
              title="Multicurrency wallet"
              subtitle="Track multicurrency wallet value fluctuations with accumulated inflation."
            />
            <WalletHydrated
              queryProps={QUERY_PROPS}
              timespan={timespan}
              walletQuoteCurrency={walletQuoteCurrency}
              walletBaseCurrencies={walletBaseCurrencies}
              isValidQuoteCurrency={isValidQuoteCurrency}
              isValidTimespan={isValidTimespan}
              isValidBaseCurrencies={isValidBaseCurrencies}
            />
          </div>
        </PagePadding>
      </PageMaxWidth>
    </Hydrate>
  );
};

export default WalletPage;
