'use client';

import { use, useEffect, useMemo, useRef, useState } from 'react';

import CheckboxList from '@components/CheckboxList';
import MultiCurrenciesLineChart from '@components/MultiCurrenciesLineChart';
import PageTitle from '@components/PageTitle';
import { CURRENCIES } from '@constants/currencies';
import { PADDING_TAILWIND } from '@constants/Globals';
import currenciesWithIndex, {
  IndexCurrency,
} from '@features/main/tools/currenciesWithIndex';
import dailyMultiCurrencyData from '@features/main/tools/dailyMultiCurrencyData';
import useLocalStorage from '@hooks/useLocalStorage';
import { ExchangeRateTimeseriesNormalized } from '@interfaces/models/IExchangerate';
import queryClientSide from '@utils/queryClientSide';

export const revalidate = 3600; // revalidate every hour

const defaultBaseCurrencies = currenciesWithIndex(['USD', 'GBP', 'EUR', 'CHF']);
const defaultQuoteCurrency = currenciesWithIndex(['PLN']);

const HomePage = () => {
  const [baseCurrenciesStorage, setStorageBaseCurrencies] =
    useLocalStorage<IndexCurrency[]>('base_currencies');
  const [quoteCurrencyStorage, setStorageQuoteCurrency] =
    useLocalStorage<IndexCurrency>('quote_currency');

  const [baseCurrencies, setBaseCurrencies] = useState<IndexCurrency[] | null>(
    null,
  );
  const [quoteCurrency, setQuoteCurrency] = useState<IndexCurrency | null>(
    null,
  );

  const baseCurrenciesStorageRef = useRef(baseCurrenciesStorage);
  const quoteCurrencyStorageRef = useRef(quoteCurrency);

  const baseCurrenciesNames = baseCurrencies?.map((c) => c.name);
  const data =
    baseCurrenciesNames?.length && quoteCurrency
      ? use(
          queryClientSide<ExchangeRateTimeseriesNormalized[]>(
            `homepage ${JSON.stringify(baseCurrencies)}`,
            () =>
              dailyMultiCurrencyData({
                years: 1,
                quote_currency: quoteCurrency?.name,
                base_currencies: baseCurrenciesNames,
                end_date: '2023-01-14',
              }),
          ),
        )
      : undefined;
  const chartData = data?.flatMap((d) => ({ name: d.base, data: d.rates }));

  useEffect(() => {
    if (!baseCurrenciesStorageRef?.current) {
      setBaseCurrencies(defaultBaseCurrencies);
      setStorageBaseCurrencies(defaultBaseCurrencies);
    } else setBaseCurrencies(baseCurrenciesStorageRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!quoteCurrencyStorageRef?.current) {
      setQuoteCurrency(defaultQuoteCurrency[0]);
    } else setQuoteCurrency(quoteCurrencyStorageRef.current);
  }, [quoteCurrencyStorageRef]);

  useEffect(() => {
    if (quoteCurrency && quoteCurrencyStorage)
      setStorageQuoteCurrency(quoteCurrency);
  }, [quoteCurrency, quoteCurrencyStorage, setStorageQuoteCurrency]);

  const availableBaseCurrencies = useMemo(
    () =>
      currenciesWithIndex(CURRENCIES.filter((c) => c !== quoteCurrency?.name)),
    [quoteCurrency],
  );

  return (
    <div className="flex h-full w-full flex-col pb-6">
      <div className={`${PADDING_TAILWIND} flex items-center justify-between`}>
        {!!quoteCurrency && (
          <PageTitle>{`Kursy walut w stosunku do ${quoteCurrency.name}`}</PageTitle>
        )}
        <div className="flex gap-x-10">
          {baseCurrencies && (
            <CheckboxList
              title="Waluty bazowe"
              items={availableBaseCurrencies}
              activeItems={baseCurrencies}
              nameExtractor={(currency) => currency.name}
              keyExtractor={(currency) => currency.id}
              onBoxClick={(value) => {
                const filtered = baseCurrencies.filter(
                  (currency) => currency.id !== value.id,
                );

                if (filtered.length < baseCurrencies.length) {
                  setBaseCurrencies(filtered);
                  setStorageBaseCurrencies(filtered);
                } else {
                  const d = baseCurrencies.concat(value);
                  setBaseCurrencies(d);
                  setStorageBaseCurrencies(d);
                }
              }}
            />
          )}
        </div>
      </div>
      <div className="flex h-full flex-col">
        {chartData && <MultiCurrenciesLineChart data={chartData} />}
      </div>
    </div>
  );
};

export default HomePage;
