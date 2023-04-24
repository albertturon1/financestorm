'use client';

// import dynamic from 'next/dynamic';

import PageMaxWidth from '@components/PageMaxWidth';
import PagePadding from '@components/PagePadding';
import SectionTitle from '@components/SectionTitle';
import { Currency } from '@interfaces/ICurrency';

// const CurrenciesRatesTiles = dynamic(
//   () => import('@features/currencies/components/CurrenciesRatesTiles'),
// );

export type CurrenciesPageProps = { currency: Currency };

// eslint-disable-next-line arrow-body-style
const CurrenciesPage = () => {
  // const [quoteCurrencyName, setQuoteCurrencyName] = useState<Currency | null>(
  //   null,
  // );
  // const quoteCurrency = useTodayRatesQuoteCurrency();
  // const { data, isLoading, isError } = useGetTodayCurrencyRatesQuery({
  //   base_currencies: CURRENCIES,
  //   quote_currency: quoteCurrencyName as Currency,
  // });

  // useEffect(() => {
  //   setQuoteCurrencyName(quoteCurrency.name);
  // }, [quoteCurrency.name]);

  return (
    <PageMaxWidth flex>
      <PagePadding flex vertical>
        <div className="flex flex-1 flex-col">
          <SectionTitle>{'All currency pairs'}</SectionTitle>
          <div className="flex h-full flex-1 items-center justify-center">
            <p className="font-medium">{'Work in progress. Visit soon...'}</p>
          </div>
        </div>
      </PagePadding>
    </PageMaxWidth>
  );
};

export default CurrenciesPage;
