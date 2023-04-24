'use client';

import { useState } from 'react';

import { DateTime, DateTimeFormatOptions } from 'luxon';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
  Brush,
} from 'recharts';
import { NameType } from 'recharts/types/component/DefaultTooltipContent';
import { ValueType } from 'tailwindcss/types/config';

import CurrencyRatePairChartTooltip from '@components/CurrencyRatePairChartTooltip';
import { xAxisIntervalDivider } from '@components/customLineChart/CustomLineChartHelpers';
import DataLoader from '@components/ui/DataLoader';
import CHART_TIMESPANS, { ChartTimespan } from '@constants/chartTimespan';
import { SERVER_DATE } from '@constants/dateTime';
import useWindowSize from '@hooks/useWindowSize';
import { Currency } from '@interfaces/ICurrency';
import { useDailyCurrencyRatesQuery } from '@src/api/client/CurrenctyRateClientApi';
import Theme from '@src/Theme';
import { separateToDailyCurrencyRates } from '@utils/convertRatesToQuoteCurrency';
import { cutNumber } from '@utils/misc';

import CurrenciesBaseQuoteChartTimespanPicker from './CurrenciesPairTimespanPicker';

const CurrenciesPairChartAndTimespan = ({
  quoteCurrency,
  baseCurrency,
}: {
  quoteCurrency: Currency;
  baseCurrency: Currency;
}) => {
  const [timespan, setTimespan] = useState<ChartTimespan>('1Y');

  const { data, error, isLoading } = useDailyCurrencyRatesQuery({
    quote_currency: quoteCurrency,
    base_currencies: [baseCurrency],
    start_date: CHART_TIMESPANS[timespan],
    end_date: DateTime.now().toFormat(SERVER_DATE),
  });

  const { screenWidth } = useWindowSize();

  const options = {
    month: 'short',
    day: 'numeric',
    year: '2-digit',
  } satisfies DateTimeFormatOptions;

  return (
    <div className="flex w-full flex-1 flex-col gap-y-6">
      <CurrenciesBaseQuoteChartTimespanPicker
        active={timespan}
        onSelect={setTimespan}
      />
      <DataLoader error={error} isLoading={isLoading} data={data}>
        {(data) => {
          const dailyCurrencyRates = separateToDailyCurrencyRates(data);
          const [currencyRates] = dailyCurrencyRates.rates_array;

          const interval = xAxisIntervalDivider({
            screenWidth,
            itemsLength: currencyRates.rates.length,
          });

          return (
            <ResponsiveContainer width="100%" height="100%" minHeight={'500px'}>
              <ComposedChart
                data={currencyRates.rates}
                margin={{
                  left: -10,
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
                <YAxis
                  domain={[
                    (dataMin: number) => cutNumber(dataMin * 0.98),
                    (dataMax: number) => cutNumber(dataMax * 1.02),
                  ]}
                  tickCount={8}
                />
                <CartesianGrid vertical={false} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={Theme.colors.navy}
                  fill={Theme.colors.dark_navy}
                />
                <Brush
                  dataKey="date"
                  height={30}
                  stroke={Theme.colors.dark_navy}
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
              </ComposedChart>
            </ResponsiveContainer>
          );
        }}
      </DataLoader>
    </div>
  );
};

export default CurrenciesPairChartAndTimespan;
