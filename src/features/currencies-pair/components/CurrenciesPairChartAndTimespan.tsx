'use client';

import { useState } from 'react';

import { DateTimeFormatOptions } from 'luxon';
import {
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
  Brush,
  AreaChart,
} from 'recharts';
import { NameType } from 'recharts/types/component/DefaultTooltipContent';
import { ValueType } from 'tailwindcss/types/config';

import CurrencyRatePairChartTooltip from '@components/CurrencyRatePairChartTooltip';
import DataLoader from '@components/ui/DataLoader';
import CHART_TIMESPANS, { ChartTimespan } from '@constants/chartTimespan';
import useWindowSize from '@hooks/useWindowSize';
import { Currency } from '@interfaces/ICurrency';
import { useDailyCurrencyRatesQuery } from '@src/api/client/CurrenctyRateClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@src/api/interfaces/ICurrenctyRateApi';
import Theme from '@src/Theme';
import {
  chartMarginLeft,
  xAxisIntervalDivider,
  yAxisDomainFormatter,
} from '@utils/chartHelpers';
import { separateToDailyCurrencyRates } from '@utils/convertRatesToQuoteCurrency';

import CurrenciesPairTimespanPicker from './CurrenciesPairTimespanPicker';

const CurrenciesPairChartAndTimespan = ({
  quoteCurrency,
  defaultChartTimespan,
  queryProps,
}: {
  quoteCurrency: Currency;
  defaultChartTimespan: ChartTimespan;
  queryProps: PrefetchDailyCurrencyRatesRequest;
}) => {
  const [timespan, setTimespan] = useState<ChartTimespan>(defaultChartTimespan);

  const { data, error, isLoading } = useDailyCurrencyRatesQuery({
    ...queryProps,
    queryParams: {
      ...queryProps.queryParams,
      start_date: CHART_TIMESPANS[timespan],
    },
  });

  const { screenWidth } = useWindowSize();

  const options = {
    month: 'short',
    day: 'numeric',
    year: '2-digit',
  } satisfies DateTimeFormatOptions;

  return (
    <div className="flex w-full flex-1 flex-col gap-y-4 lg:gap-y-6">
      <CurrenciesPairTimespanPicker active={timespan} onSelect={setTimespan} />
      <DataLoader error={error} isLoading={isLoading} data={data}>
        {(data) => {
          const dailyCurrencyRates = separateToDailyCurrencyRates(data);
          const [currencyRates] = dailyCurrencyRates.rates_array;

          const interval = xAxisIntervalDivider({
            screenWidth,
            itemsLength: currencyRates.rates.length,
          });
          const setMinValue = Math.min(
            ...currencyRates.rates.map((r) => r.value),
          );

          return (
            <div className="h-[60vh] w-full">
              <ResponsiveContainer width={'100%'} height={'100%'}>
                <AreaChart
                  data={currencyRates.rates}
                  margin={{
                    left: chartMarginLeft(setMinValue),
                    right: 5,
                  }}
                >
                  <XAxis
                    tickMargin={10}
                    height={50}
                    dataKey="date"
                    interval={interval}
                    tickFormatter={(tick: string) =>
                      new Date(tick).toLocaleDateString('en-US', options)
                    }
                  />
                  <YAxis domain={yAxisDomainFormatter} tickCount={8} />
                  <CartesianGrid vertical={false} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={Theme.colors.navy}
                    fill={Theme.colors.dark_navy}
                  />
                  <Brush
                    dataKey="date"
                    height={40}
                    stroke={Theme.colors.dark_navy}
                    travellerWidth={screenWidth < 768 ? 20 : 15} //easier to handle on mobile when value is higher
                  />
                  <Tooltip
                    content={(props: TooltipProps<ValueType, NameType>) => (
                      <CurrencyRatePairChartTooltip
                        quoteCurrency={quoteCurrency}
                        {...props}
                      />
                    )}
                    cursor={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          );
        }}
      </DataLoader>
    </div>
  );
};

export default CurrenciesPairChartAndTimespan;
