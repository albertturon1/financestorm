import { TooltipProps } from 'recharts';

import FlagCountryCode from '@components/misc/FlagCountryCode';
import TooltipRowWrapper from '@components/tooltip/TooltipRowWrapper';
import TooltipWrapper from '@components/tooltip/TooltipWrapper';
import { CHART_THEME, CHART_TOOLTIP_DATE_OPTIONS } from '@constants/chart';
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
  const localDateString = date.toLocaleDateString(
    'en-US',
    CHART_TOOLTIP_DATE_OPTIONS,
  );

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
              <div className="flex flex-1 gap-x-2">
                {/* color markers */}
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
                <FlagCountryCode reverse code={name as Currency} />
              </div>
              <p>{`${cutNumber(
                payload.value,
              )} ${quoteCurrency.toUpperCase()}`}</p>
            </TooltipRowWrapper>
          ))}
      </div>
    </TooltipWrapper>
  );
};
export default MultiCurrenciesChartTooltip;
