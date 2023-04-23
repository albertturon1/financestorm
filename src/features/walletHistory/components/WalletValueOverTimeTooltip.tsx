import { DateTime } from 'luxon';
import { TooltipProps } from 'recharts';

import TooltipRowWrapper from '@components/TooltipRowWrapper';
import TooltipWrapper from '@components/TooltipWrapper';
import { CHART_THEME } from '@constants/chart';
import { CustomTooltipProps, WalletDay } from '@interfaces/ICharts';

import { InflationWalletOverTimeValue } from '../tools/inflationWalletOverTimeValue';

type P = [
  CustomTooltipProps<WalletDay>,
  CustomTooltipProps<InflationWalletOverTimeValue>,
];

const WalletValueOverTimeTooltip = ({
  active,
  payload,
  currentWalletValue,
}: TooltipProps<number, string> & {
  currentWalletValue: number;
}) => {
  if (!active || !payload?.length) return null;
  const data = payload as P;

  return (
    <TooltipWrapper>
      <TooltipRowWrapper>
        <p>{'Dzisiejsza wartość portfela: '}</p>
        <p>{`${currentWalletValue} PLN`}</p>
      </TooltipRowWrapper>
      <div className="mb-1.5 mt-1 h-0.5 w-full border-b border-slate-50" />
      <p style={{ color: CHART_THEME[0] }}>{`Dzień: ${DateTime.fromISO(
        data[0].payload.date,
      ).toLocaleString(DateTime.DATE_FULL)}`}</p>
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
                <p>{`${values.inflationLoss} ${data[0].payload.quoteCurrency.currency}`}</p>
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
