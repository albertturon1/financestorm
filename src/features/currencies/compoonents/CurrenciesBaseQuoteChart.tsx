'use client';

import { useCallback, useMemo, useState } from 'react';

import { DateTime, DateTimeFormatOptions } from 'luxon';
import { useRouter } from 'next/navigation';
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

import CurrenciesSelectList from '@components/CurrenciesSelectList';
import CurrencyRatePairChartTooltip from '@components/CurrencyRatePairChartTooltip';
import { xAxisIntervalDivider } from '@components/customLineChart/CustomLineChartHelpers';
import FlagCountryCode from '@components/FlagCountryCode';
import DataLoader from '@components/ui/DataLoader';
import CHART_TIMESPANS, { ChartTimespan } from '@constants/chartTimespan';
import { CURRENCIES } from '@constants/currencies';
import { SERVER_DATE } from '@constants/dateTime';
import useWindowSize from '@hooks/useWindowSize';
import { Currency } from '@interfaces/ICurrency';
import { useDailyCurrencyRatesQuery } from '@src/api/client/CurrenctyRateClientApi';
import Theme from '@src/Theme';
import { separateToDailyCurrencyRates } from '@utils/convertRatesToQuoteCurrency';
import { cutNumber } from '@utils/misc';

import CurrenciesBaseQuoteChartTimespanPicker from './CurrenciesBaseQuoteChartTimespanPicker';

const CurrenciesBaseQuoteChart = ({
  quoteCurrency,
  baseCurrency,
}: {
  quoteCurrency: Currency;
  baseCurrency: Currency;
}) => {
  const router = useRouter();
  const [timespan, setTimespan] = useState<ChartTimespan>('1Y');

  const { data, error, isLoading } = useDailyCurrencyRatesQuery({
    quote_currency: quoteCurrency,
    base_currencies: [baseCurrency],
    start_date: CHART_TIMESPANS[timespan],
    end_date: DateTime.now().toFormat(SERVER_DATE),
  });
  const { screenWidth } = useWindowSize();

  const baseCurrenciesAvailable = useMemo(
    () => CURRENCIES.filter((currency) => currency !== baseCurrency),
    [baseCurrency],
  );
  const quoteCurrenciesAvailable = useMemo(
    () => CURRENCIES.filter((currency) => currency !== quoteCurrency),
    [quoteCurrency],
  );

  const tooltip = useCallback(
    (props: TooltipProps<ValueType, NameType>) => (
      <CurrencyRatePairChartTooltip quoteCurrency={quoteCurrency} {...props} />
    ),
    [quoteCurrency],
  );

  const userLocale = navigator.language;
  const options = {
    month: 'short',
    day: 'numeric',
    year: '2-digit',
  } satisfies DateTimeFormatOptions;

  return (
    <div className="flex w-full flex-1 flex-col gap-y-6">
      {/* Currencies select */}
      <div className="flex w-full gap-x-4">
        <div className="flex flex-1 flex-col gap-y-1">
          <p className="font-medium">{'From'}</p>
          <CurrenciesSelectList
            onValueChange={(newBaseCurrency) => {
              void router.push(
                `/currencies/${newBaseCurrency}-${quoteCurrency}`,
              );
            }}
            value={baseCurrency}
            currencies={baseCurrenciesAvailable}
            title={() => <FlagCountryCode code={baseCurrency} />}
          />
        </div>
        <div className="flex flex-1 flex-col gap-y-1">
          <p className="font-medium">{'To'}</p>
          <CurrenciesSelectList
            onValueChange={(newQuoteCurrency) => {
              void router.push(
                `/currencies/${baseCurrency}-${newQuoteCurrency}`,
              );
            }}
            value={baseCurrency}
            currencies={quoteCurrenciesAvailable}
            title={() => <FlagCountryCode code={quoteCurrency} />}
          />
        </div>
      </div>
      <CurrenciesBaseQuoteChartTimespanPicker
        active={timespan}
        onSelect={(timespan) => {
          setTimespan(timespan);
        }}
      />
      <DataLoader error={error} isLoading={isLoading} data={data}>
        {(data) => {
          const dailyCurrencyRates = separateToDailyCurrencyRates(data);
          const [currencyRates] = dailyCurrencyRates.rates_array;

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
                  interval={xAxisIntervalDivider({
                    screenWidth,
                    itemsLength: currencyRates.rates.length,
                  })}
                  tickFormatter={(tick: string) =>
                    new Date(tick).toLocaleDateString(userLocale, options)
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
                <Tooltip content={tooltip} cursor={false} />
              </ComposedChart>
            </ResponsiveContainer>
          );
        }}
      </DataLoader>
    </div>
  );
};

export default CurrenciesBaseQuoteChart;
