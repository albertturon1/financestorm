'use client';

import { useCallback, useMemo } from 'react';

import { TooltipProps } from 'recharts';

import CustomLineChart, {
  customLineChartYDomain,
} from '@components/CustomLineChart';
import FlagCountryCode from '@components/FlagCountryCode';
import { PADDING_TAILWIND } from '@constants/Globals';
import MultiCurrenciesLineChartTooltip from '@features/multi-currencies/components/MultiCurrenciesLineChartTooltip';
import { RechartsMultiData } from '@interfaces/ICharts';
import { Currencies } from '@interfaces/ICurrency';
import { useDailyCurrencyRatesTimeseriesQuery } from '@src/api/client/CurrenctyRateApi';
import { nameOfKey, serverDate } from '@utils/misc';

import { CurrenciesCurrencyProps } from '../page';

const nameExtractor = (item: RechartsMultiData) => item.name;
const dataExtractor = (item: RechartsMultiData) => item.data;
const dataKeyExtractor = (item: RechartsMultiData) =>
  nameOfKey(item.data[0], (x) => x.value);

type CurrenciesPairProps = { quote: Currencies } & CurrenciesCurrencyProps;

const CurrenciesPair = ({ params }: { params: CurrenciesPairProps }) => {
  const { currency, quote } = params;
  const { data } = useDailyCurrencyRatesTimeseriesQuery({
    quote_currency: quote,
    base_currency: currency,
    start_date: '2021-01-01',
    end_date: serverDate(new Date()),
  });

  //data.rates to obiekt - najpierw znormalizuj
  //const chartData = useMemo(
  //  () =>
  //    data.rates
  //      ?.flatMap((d) => ({ name: d.base, data: d.rates }))
  //      .filter((z) => z.data.length) as RechartsMultiData[],
  //  [data],
  //);
  //const values = useMemo(
  //  () => chartData.flatMap((c) => c.data.map((d) => d.value)),
  //  [chartData],
  //);

  //const yDomain = useMemo(
  //  () => [0, customLineChartYDomain(values, 2)[1], 2], //mutli nie działa
  //  [values],
  //);

  //const tooltip = useCallback(
  //  (props: TooltipProps<number, string>) => (
  //    <MultiCurrenciesLineChartTooltip {...props} />
  //  ),
  //  [],
  //);

  return (
    <div />
    //<div className={`${PADDING_TAILWIND} flex h-full w-full flex-col pb-4`}>
    //  <div className="flex justify-between w-full pb-5">
    //    <div className="flex items-center text-xl gap-x-2">
    //      <FlagCountryCode code={currency.toUpperCase()} className="gap-x-0" />
    //      <p className="text-2xl font-bold">{'/'}</p>
    //      <FlagCountryCode code={quote.toUpperCase()} className="gap-x-0" />
    //    </div>
    //  </div>
    //  <CustomLineChart
    //    data={chartData}
    //    dataKeyExtractor={dataKeyExtractor}
    //    dataExtractor={dataExtractor}
    //    nameExtractor={nameExtractor}
    //    keyExtractor={nameExtractor}
    //    yDomain={yDomain}
    //    xAxisLabel="label"
    //    tooltip={tooltip}
    //    legend={false}
    //  />
    //</div>
  );
};

export default CurrenciesPair;
