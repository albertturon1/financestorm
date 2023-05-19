'use client';

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

import DataLoader, { DataLoaderQueryProps } from '@components/ui/DataLoader';
import { CHART_X_AXIS_TICK_FORMATTER_OPTIONS } from '@constants/chart';
import CurrencyRatePairChartTooltip from '@features/currencies-pair/components/CurrencyRatePairChartTooltip';
import useWindowSize from '@hooks/useWindowSize';
import { Currency } from '@interfaces/ICurrency';
import { ExchangeRateTimeseriesResponse } from '@interfaces/models/IExchangerate';
import Theme from '@src/Theme';
import { yAxisDomainFormatter } from '@utils/chartHelpers';
import { separateDailyCurrencyRates } from '@utils/currencyRateApiHelpers';

const CurrenciesPairChart = (
  props: {
    quoteCurrency: Currency;
    baseCurrency: Currency;
  } & DataLoaderQueryProps<ExchangeRateTimeseriesResponse | undefined>,
) => {
  const { screenWidth } = useWindowSize();

  //data loader makes sense when data is being refetch on client - best thing you can do is to handle errors and show fallback when loading --- dont forget to set ssr: false
  return (
    <DataLoader {...props}>
      {(data) => {
        const dailyCurrencyRates = separateDailyCurrencyRates(data);
        const [currencyRates] = dailyCurrencyRates.rates_array;

        return (
          <div className="flex flex-col gap-y-10">
            <div className="h-[45vh] w-full">
              <ResponsiveContainer width={'100%'} height={'100%'}>
                <AreaChart data={currencyRates.rates} margin={{ top: 20 }}>
                  <XAxis
                    tickMargin={10}
                    tick={{ fontSize: 15, letterSpacing: -0.5 }}
                    height={50}
                    dataKey="date"
                    tickFormatter={(tick: string) =>
                      new Date(tick).toLocaleDateString(
                        'en-US',
                        CHART_X_AXIS_TICK_FORMATTER_OPTIONS,
                      )
                    }
                  />
                  <YAxis
                    domain={yAxisDomainFormatter}
                    tickCount={5}
                    mirror
                    tick={{
                      fill: Theme.colors.dark_navy,
                      dy: -11,
                      fontWeight: 400,
                    }}
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
                    height={40}
                    stroke={Theme.colors.dark_navy}
                    travellerWidth={screenWidth < 768 ? 20 : 15} //easier to handle on mobile when value is higher
                  />
                  <Tooltip
                    content={(
                      tooltipProps: TooltipProps<ValueType, NameType>,
                    ) => (
                      <CurrencyRatePairChartTooltip
                        {...props}
                        {...tooltipProps}
                      />
                    )}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      }}
    </DataLoader>
  );
};

export default CurrenciesPairChart;
