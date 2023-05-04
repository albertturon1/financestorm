import { DateTimeFormatOptions } from 'luxon';
import { TooltipProps } from 'recharts';

import FlagCountryCode from '@components/misc/FlagCountryCode';
import TooltipRowWrapper from '@components/tooltip/TooltipRowWrapper';
import TooltipWrapper from '@components/tooltip/TooltipWrapper';
import { CHART_THEME } from '@constants/chart';
import { CustomTooltipProps, LabelValue } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import { cn, cutNumber } from '@utils/misc';

import { CurrencyNameAndArrayIndex } from './MultiCurrenciesChart';

type TooltipPayload = CustomTooltipProps<LabelValue>[];

const MultiCurrenciesChartTooltip = ({
  active,
  payload,
  quoteCurrency,
  originalIndexesOfCurrencies,
}: {
  quoteCurrency: Currency;
  originalIndexesOfCurrencies: CurrencyNameAndArrayIndex[];
} & TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  const currencyRates = payload as TooltipPayload;

  const date = new Date(currencyRates[0].payload.date);
  const options = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  } satisfies DateTimeFormatOptions;
  const localDateString = date.toLocaleDateString('en-US', options);

  return (
    <TooltipWrapper className="gap-y-2">
      <p>{localDateString}</p>
      <div>
        {currencyRates
          .sort((a, b) => (a.value > b.value ? -1 : 1))
          .map(({ name, payload }, index) => (
            <TooltipRowWrapper
              key={`${name}-${payload.date}`}
              className={cn(
                'flex justify-between gap-x-2 py-2',
                index !== currencyRates.length - 1 && 'border-b border-navy ',
              )}
            >
              <div
                className="h-4 w-4"
                style={{
                  backgroundColor:
                    CHART_THEME[
                      originalIndexesOfCurrencies.findIndex(
                        (c) => c.name === name,
                      ) % CHART_THEME.length
                    ],
                }}
              />
              <FlagCountryCode
                reverse
                code={name as Currency}
                flagClassName="w-8"
              />
              <p>{`${cutNumber(payload.value)} ${quoteCurrency}`}</p>
            </TooltipRowWrapper>
          ))}
      </div>
    </TooltipWrapper>
  );
};
export default MultiCurrenciesChartTooltip;
