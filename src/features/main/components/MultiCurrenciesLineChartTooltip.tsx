import { ReactElement } from 'react';

import { TooltipProps } from 'recharts';

import FlagCountryCode from '@components/FlagCountryCode';
import TooltipRowWrapper from '@components/TooltipRowWrapper';
import TooltipWrapper from '@components/TooltipWrapper';
import { CHART_THEME } from '@constants/chartTheme';
import { CustomTooltipProps } from '@interfaces/ICharts';
import { NormalizedCurrencyExchangeRate } from '@interfaces/models/IExchangerate';

type P = CustomTooltipProps<NormalizedCurrencyExchangeRate>;

const MultiCurrenciesLineChartTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>): ReactElement | null => {
  if (!active || !payload?.length) return null;
  const data = payload as P[];

  return (
    <TooltipWrapper>
      <p className="pb-2">{`Dzień: ${data[0].payload.label}`}</p>
      <p className="pb-2">{`Waluta kwotowana: ${data[0].payload.to}`}</p>
      {data.map(({ payload: values }, index) => (
        <TooltipRowWrapper
          key={`${values.from}${values.to}`}
          className="justify-between"
        >
          <div
            className="h-4 w-4"
            style={{ backgroundColor: CHART_THEME[index] }}
          />
          <FlagCountryCode
            reverse
            code={values.from}
            flagStyle={{
              width: values.from === 'CHF' ? 17 : 24, //TODO
            }}
            boldName={false}
          />
          <p>{values.value}</p>
        </TooltipRowWrapper>
      ))}
    </TooltipWrapper>
  );
};
export default MultiCurrenciesLineChartTooltip;
