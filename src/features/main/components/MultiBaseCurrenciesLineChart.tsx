'use client';

import { use } from 'react';

import CustomLineChart, {
  customLineChartYDomain,
} from '@components/CustomLineChart';
import { ExchangeRateTimeseriesNormalized } from '@interfaces/models/IExchangerate';
import {
  useBaseCurrenciesNames,
  useQuoteCurrency,
} from '@src/zustand/multiCurrenciesStore';
import { nameOfKey } from '@utils/misc';
import queryClientSide from '@utils/queryClientSide';

import MultiCurrenciesLineChartTooltip from './MultiCurrenciesLineChartTooltip';
import dailyMultiCurrencyData from '../tools/dailyMultiCurrencyData';

const MultiBaseCurrenciesLineChart = () => {
  const quoteCurrency = useQuoteCurrency();
  const baseCurrenciesNames = useBaseCurrenciesNames();

  if (!baseCurrenciesNames?.length || !quoteCurrency) return null;
  const data = use(
    queryClientSide<ExchangeRateTimeseriesNormalized[]>(
      `${baseCurrenciesNames.sort().join('')}${quoteCurrency.id}`,
      () =>
        dailyMultiCurrencyData({
          years: 1,
          quote_currency: quoteCurrency?.name,
          base_currencies: baseCurrenciesNames,
        }),
    ),
  );

  const chartData = data
    ?.flatMap((d) => ({ name: d.base, data: d.rates }))
    .filter((z) => z.data.length);
  const values = chartData.flatMap((c) => c.data.map((d) => d.value));
  const yDomain = [0, customLineChartYDomain(values, 2)[1]];

  return (
    <CustomLineChart
      data={chartData}
      dataKeyExtractor={(item) => nameOfKey(item.data[0], (x) => x.value)}
      dataExtractor={(item) => item.data}
      nameExtractor={(item) => item.name}
      keyExtractor={(item) => item.name}
      yAxisTickCount={10}
      yDomain={yDomain}
      xAxisLabel="label"
      tooltip={<MultiCurrenciesLineChartTooltip />}
    />
  );
};

export default MultiBaseCurrenciesLineChart;
