import { TooltipProps } from 'recharts';

import FlagCountryCode from '@components/FlagCountryCode';
import TooltipRowWrapper from '@components/TooltipRowWrapper';
import TooltipWrapper from '@components/TooltipWrapper';
import { CHART_THEME } from '@constants/chartTheme';
import { CustomTooltipProps } from '@interfaces/ICharts';
import { NormalizedCurrencyExchangeRate } from '@interfaces/models/IExchangerate';
import { reverseServerDate } from '@utils/misc';

type TooltipPayload = CustomTooltipProps<NormalizedCurrencyExchangeRate>[];

const MultiCurrenciesLineChartTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  const data = payload as TooltipPayload;
  const day = reverseServerDate(data[0].payload.label);

  return (
    <TooltipWrapper className="px-0 pb-3">
      <div className="flex flex-col px-5">
        <p>{`Dzień: ${day}`}</p>
        <div className="flex items-center justify-between gap-x-3 pb-3">
          <p>{'Waluta kwotowana: '}</p>
          <p>{data[0].payload.to}</p>
        </div>
      </div>
      {[...data]
        .sort((a, b) => (a.value > b.value ? -1 : 1))
        .map(({ payload: values }, index) => (
          <TooltipRowWrapper
            key={`${values.from}${values.to}`}
            className={`flex justify-between gap-x-3 px-5 py-1.5 ${
              index % 2 === 0 ? 'bg-gray-700' : ''
            }`}
          >
            <div
              className="h-4 w-4"
              style={{
                backgroundColor:
                  CHART_THEME[
                    data.findIndex((c) => c.payload.from === values.from)
                  ],
              }}
            />
            <div className="flex flex-1 justify-between">
              <FlagCountryCode reverse code={values.from} boldName={false} />
              <p>{values.value.toFixed(3)}</p>
            </div>
          </TooltipRowWrapper>
        ))}
    </TooltipWrapper>
  );
};
export default MultiCurrenciesLineChartTooltip;
