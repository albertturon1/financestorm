import { ReactElement } from 'react';

import { TooltipProps } from 'recharts';

import TooltipRowWrapper from '@components/TooltipRowWrapper';
import TooltipWrapper from '@components/TooltipWrapper';
import { CHART_THEME } from '@constants/chartTheme';
import { CustomTooltipProps, DateValue } from '@interfaces/ICharts';

import { InflationWalletOverTimeValue } from '../tools/inflationWalletOverTimeValue';

type P = [
  CustomTooltipProps<DateValue>,
  CustomTooltipProps<InflationWalletOverTimeValue>,
];

const WalletValueOverTimeTooltip = ({
  active,
  payload,
  currentWalletValue,
}: TooltipProps<number, string> & {
  currentWalletValue: number;
}): ReactElement | null => {
  if (!active || !payload?.length) return null;
  const data = payload as P;

  return (
    <TooltipWrapper>
      <TooltipRowWrapper>
        <p>{'Dzisiejsza wartość portfela: '}</p>
        <p>{`${currentWalletValue} PLN`}</p>
      </TooltipRowWrapper>
      <div className="h-0.5 w-full border-b border-slate-50" />
      <p
        className="pt-1"
        style={{ color: CHART_THEME[0] }}
      >{`Dzień: ${data[0].payload.label}`}</p>
      {data.map(({ payload: values }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          <TooltipRowWrapper style={{ color: CHART_THEME[index] }}>
            <p>{`${data[index].name}:`}</p>
            <p>{`${values.value} PLN`}</p>
          </TooltipRowWrapper>
          {/*Months with monthly inflation*/}
          {'cumulativeInflation' in values && !!values.monthlyInflation && (
            <>
              <TooltipRowWrapper>
                <p>{'Miesięczna inflacja: '}</p>
                <p>{`${values.monthlyInflation}%`}</p>
              </TooltipRowWrapper>
              <TooltipRowWrapper>
                <p>{'Skumulowana inflacja: '}</p>
                <p>{`${values.cumulativeInflation}%`}</p>
              </TooltipRowWrapper>
              <TooltipRowWrapper>
                <p>{'Utrata wartości: '}</p>
                <p>{`${values.inflationLoss}`}</p>
              </TooltipRowWrapper>
              <TooltipRowWrapper>
                <p>{'CPI: '}</p>
                <p>{`${values.cpi}`}</p>
              </TooltipRowWrapper>
            </>
          )}
        </div>
      ))}
    </TooltipWrapper>
  );
};

export default WalletValueOverTimeTooltip;
