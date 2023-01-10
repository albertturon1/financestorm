'use client';

import Loader from '@components/Loader';
import PageTitle from '@components/PageTitle';
import { PADDING_TAILWIND } from '@constants/Globals';
import useDailyCurrencyRatesData from '@features/currencies/hooks/useDailyCurrencyRatesData';

import CurrencyPairLineChart from '../components/CurrencyPairLineChart';

export interface CurrenciesProps {
  pair: string;
}

export default function Page({ params }: { params: CurrenciesProps }) {
  const { pair } = params;
  const [baseCurrency, quoteCurrency] = pair.split('-');

  const [dailyCurrencyData, { isLoading }] = useDailyCurrencyRatesData({
    baseCurrency,
    quoteCurrency,
  });

  return (
    <div className={`h-full w-full ${PADDING_TAILWIND}`}>
      <PageTitle>
        {`Kurs ${params.pair.split('-').join('/').toUpperCase()}`}
      </PageTitle>
      <div className="mt-10 flex w-full" style={{ height: 1000 }}>
        {!isLoading && dailyCurrencyData ? (
          <CurrencyPairLineChart data={dailyCurrencyData.data} />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
