import { ReactElement } from 'react';

import { TooltipProps } from 'recharts';

import { CHART_THEME } from '@constants/chartTheme';

const MultiCurrenciesLineChartTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>): ReactElement | null => {
  if (!active || !payload?.length) return null;
  return (
    <div className="mx-10 rounded border border-slate-50">
      <div className=" flex flex-col gap-y-3 bg-secondaryBlack  p-4">
        <p className="pb-2">{`Dzień: ${payload[0].payload.label}`}</p>
        {payload.map(({ payload }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="mb-1 flex items-center  gap-x-2">
            <div
              className="h-4 w-4"
              style={{ backgroundColor: CHART_THEME[index] }}
            />
            <FlagCountryCode
              reverse
              code={payload.from}
              flagStyle={{
                width: payload.from === 'CHF' ? 17 : 24, //TODO
              }}
              boldName={false}
            />
            <p>{payload.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MultiCurrenciesLineChartTooltip;
