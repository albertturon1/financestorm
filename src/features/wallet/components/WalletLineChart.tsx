'use client';

import { memo, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { TooltipProps } from 'recharts';

import CustomLineChart from '@components/customLineChart';
import Loader from '@components/misc/Loader';
import { ChartMultiData } from '@interfaces/ICharts';
import { NormalizedCurrencyExchangeRate } from '@interfaces/models/IExchangerate';
import {
  useMultiCurrenciesQuoteCurrency,
  useMultiCurrenciesBaseCurrenciesNames,
} from '@src/zustand/multiCurrenciesStore';
import {
  customLineChartYDomain,
  xAxisDateTickFormatter,
} from '@utils/chartHelpers';
import convertDailyCurrencyTimeseriesToChartData from '@utils/convertDailyCurrencyTimeseriesToChartData';
import dailyCurrencyTimeseriesYears from '@utils/dailyCurrencyTimeseriesYears';
import { nameOfKey } from '@utils/misc';

import MultiCurrenciesChartTooltip from './WalletChartTooltip';

const nameExtractor = (item: ChartMultiData<NormalizedCurrencyExchangeRate>) =>
  item.name;

const dataExtractor = (item: ChartMultiData<NormalizedCurrencyExchangeRate>) =>
  item.data;

const dataKeyExtractor = (
  item: ChartMultiData<NormalizedCurrencyExchangeRate>,
) => nameOfKey(item.data[0], (x) => x.value);

const tooltip = (props: TooltipProps<number, string>) => (
  <MultiCurrenciesChartTooltip {...props} />
);

const xAxisLabelExtractor = (
  item: ChartMultiData<NormalizedCurrencyExchangeRate>,
) => nameOfKey(item.data[0], (x) => x.date);

const MultiCurrenciesChart = () => {
  const quoteCurrency = useMultiCurrenciesQuoteCurrency();
  const baseCurrencies = useMultiCurrenciesBaseCurrenciesNames();

  const props = {
    quote_currency: quoteCurrency.name,
    base_currencies: baseCurrencies,
    years: 1,
  };

  const { data, isLoading } = useQuery(
    ['dailyCurrencyTimeseriesYears', props],
    () => dailyCurrencyTimeseriesYears(props),
  );

  const chartData = useMemo(
    () => convertDailyCurrencyTimeseriesToChartData(data),
    [data],
  );

  const yDomain = useMemo(
    () =>
      customLineChartYDomain(
        chartData.flatMap((c) => c.data.map((d) => d.value)),
        2,
      ),
    [chartData],
  );

  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-1">
      <CustomLineChart
        margin={{ top: 5, left: -20 }}
        data={chartData}
        dataKeyExtractor={dataKeyExtractor}
        dataExtractor={dataExtractor}
        nameExtractor={nameExtractor}
        xAxisLabelExtractor={xAxisLabelExtractor}
        yAxisTickCount={10}
        yDomain={yDomain}
        xAxisLabel="label"
        tooltip={tooltip}
        xAxisTickFormatter={xAxisDateTickFormatter}
      />
    </div>
  );
};

const Memo = memo(MultiCurrenciesChart);
export default Memo;
