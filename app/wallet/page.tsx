import { Hydrate } from '@tanstack/react-query';
import { DateTime } from 'luxon';

import PageMaxWidth from '@components/misc/PageMaxWidth';
import PagePadding from '@components/misc/PagePadding';
import PageTitle from '@components/misc/PageTitle';
import {
  CURRENCIES,
  DEFAULT_BASE_CURRENCIES,
  DEFAULT_CURRENCY_AMOUNT,
  DEFAULT_QUOTE_CURRENCY,
} from '@constants/currencies';
import { SERVER_DATE } from '@constants/dateTime';
import { DEFAULT_TIMESPAN, TIMESPANS } from '@constants/timespans';
import WalletHydrated from '@features/wallet/components/WalletHydrated';
import { ChartTimespan } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import { prefetchDailyCurrencyRatesOverYearQuery } from '@src/api/CurrencyRateApi';
import {
  DailyCurrencyRatesRequest,
  PrefetchDailyCurrencyRatesRequest,
} from '@src/api/interfaces/ICurrencyRateApi';
import { WalletCurrency } from '@src/zustand/walletStore';
import { baseCurrenciesFromQuery } from '@utils/misc';

function walletCurrencyFromString(param: string) {
  const matches = param.match(/^(\d+)(\D+)$/);
  if (CURRENCIES.includes(param))
    return {
      amount: NaN,
      name: param as Currency,
    } satisfies WalletCurrency;
  if (!matches) return;
  const [_, amount, currency] = matches;
  return {
    amount: Number(amount),
    name: currency as Currency,
  } satisfies WalletCurrency;
}

export type WalletPageProps = {
  quote: Currency;
  base: string;
  timespan: ChartTimespan;
};

const WalletPage = async ({
  searchParams,
}: {
  searchParams: WalletPageProps;
}) => {
  const { quote, base, timespan: queryTimespan } = searchParams;
  const walletQuoteCurrency = (walletCurrencyFromString(quote) ?? {
    name: DEFAULT_QUOTE_CURRENCY,
    amount: DEFAULT_CURRENCY_AMOUNT,
  }) satisfies WalletCurrency;

  const baseCurrenciesFromString = baseCurrenciesFromQuery(
    base,
    walletQuoteCurrency.name,
  );

  const walletBaseCurrencies =
    baseCurrenciesFromString && baseCurrenciesFromString.length
      ? baseCurrenciesFromString
          .map((c) => walletCurrencyFromString(c))
          .filter((c) => {
            console.log('caaaaa', c);
            return Boolean(c);
          })
      : DEFAULT_BASE_CURRENCIES.map((c) => ({
          name: c,
          amount: DEFAULT_CURRENCY_AMOUNT,
        }));

  const walletBaseCurrenciesNames = walletBaseCurrencies.map((c) => c.name);

  const timespan = Object.keys(TIMESPANS).includes(queryTimespan)
    ? queryTimespan
    : DEFAULT_TIMESPAN;

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

  const hydratedState = await prefetchDailyCurrencyRatesOverYearQuery(
    QUERY_PROPS,
  );

  return (
    <Hydrate state={hydratedState}>
      <PageMaxWidth>
        <PagePadding vertical>
          <div className="flex w-full flex-1 flex-col gap-y-6 lg:gap-y-8">
            <PageTitle
              title="Multicurrency wallet"
              subtitle="Track wallet value fluctuations with multicurrency wallet data"
            />
            <WalletHydrated
              queryProps={QUERY_PROPS}
              timespan={timespan}
              walletBaseCurrencies={walletBaseCurrencies}
              walletQuoteCurrency={walletQuoteCurrency}
            />
          </div>
        </PagePadding>
      </PageMaxWidth>
    </Hydrate>
  );
};

export default WalletPage;
