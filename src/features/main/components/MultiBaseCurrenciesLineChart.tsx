'use client';

import { use } from 'react';

import MultiCurrenciesLineChart from '@components/MultiCurrenciesLineChart';
import { ExchangeRateTimeseriesNormalized } from '@interfaces/models/IExchangerate';
import queryClientSide from '@utils/queryClientSide';

import useHomePageCurrencies from '../hooks/useHomePageCurrencies';
import dailyMultiCurrencyData from '../tools/dailyMultiCurrencyData';

const MultiBaseCurrenciesLineChart = () => {
  const { baseCurrencies, quoteCurrency } = useHomePageCurrencies();
  const baseCurrenciesNames = baseCurrencies?.map((c) => c.name);
  console.log('baseCurrencies: ', baseCurrencies);

  if (!baseCurrenciesNames?.length || !quoteCurrency) return null;
  const data = use(
    queryClientSide<ExchangeRateTimeseriesNormalized[]>(
      baseCurrenciesNames.join(''),
      () =>
        dailyMultiCurrencyData({
          years: 1,
          quote_currency: quoteCurrency?.name,
          base_currencies: baseCurrenciesNames,
          end_date: '2023-01-14',
        }),
    ),
  );

  const chartData = data?.flatMap((d) => ({ name: d.base, data: d.rates }));
  return <MultiCurrenciesLineChart data={chartData} />;
};

export default MultiBaseCurrenciesLineChart;

//'use client';

//import { use } from 'react';

//import { useQuery } from '@tanstack/react-query';

//import MultiCurrenciesLineChart from '@components/MultiCurrenciesLineChart';
//import { ExchangeRateTimeseriesNormalized } from '@interfaces/models/IExchangerate';
//import queryClientSide from '@utils/queryClientSide';

//import useHomePageCurrencies from '../hooks/useHomePageCurrencies';
//import dailyMultiCurrencyData from '../tools/dailyMultiCurrencyData';

//const MultiBaseCurrenciesLineChart = () => {
//  const { baseCurrencies, quoteCurrency } = useHomePageCurrencies();
//  const baseCurrenciesNames = baseCurrencies?.map((c) => c.name);
//  const { data } = useQuery(
//    [`homepage ${JSON.stringify(baseCurrencies)}`],
//    () =>
//      dailyMultiCurrencyData({
//        years: 1,
//        quote_currency: quoteCurrency?.name,
//        base_currencies: baseCurrenciesNames,
//        end_date: '2023-01-14',
//      }),
//    { enabled: !!baseCurrenciesNames?.length && !!quoteCurrency },
//  );

//  const chartData = data?.flatMap((d) => ({ name: d.base, data: d.rates }));
//  if (!chartData) return null;
//  return <MultiCurrenciesLineChart data={chartData} />;
//};

//export default MultiBaseCurrenciesLineChart;
