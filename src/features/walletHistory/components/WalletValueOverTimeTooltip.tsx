/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { ReactElement } from 'react';

import { TooltipProps } from 'recharts';

import TooltipWrapper from '@components/TooltipWrapper';
import { CHART_THEME } from '@constants/chartTheme';

const WalletValueOverTimeTooltip = ({
  active,
  payload,
  currentWalletValue,
}: TooltipProps<number, string> & {
  currentWalletValue: number;
}): ReactElement | null => {
  if (!active || !payload?.length) return null;
  const row = 'mb-1 flex items-center  gap-x-2';
  return (
    <TooltipWrapper>
      <div className={row}>
        <p>{'Dzisiejsza wartość portfela: '}</p>
        <p>{`${currentWalletValue} PLN`}</p>
      </div>
      <div className='border-b border-slate-50 h-0.5 w-full'/>
      <p
        className="pt-1"
        style={{ color: CHART_THEME[0] }}
      >{`Dzień: ${payload[0].payload.label}`}</p>
      {payload.map(({ payload: p }, index) => (
        <>
          <div className={row} style={{ color: CHART_THEME[index] }}>
            {/*eslint-disable-next-line @typescript-eslint/restrict-template-expressions*/}
            <p>{`${payload[index].name}:`}</p>
            <p>{`${p.value} PLN`}</p>
          </div>
          {!!p.monthlyInflation && (
            <div className={row}>
              <p>{'Miesięczna inflacja: '}</p>
              <p>{`${p.monthlyInflation}%`}</p>
            </div>
          )}
          {!!p.cumulativeInflation && (
            <div className={row}>
              <p>{'Skumulowana inflacja: '}</p>
              <p>{`${p.cumulativeInflation}%`}</p>
            </div>
          )}
          {!!p.inflationLoss && (
            <div className={row}>
              <p>{'Utrata wartości: '}</p>
              <p>{`${p.inflationLoss}`}</p>
            </div>
          )}
          {!!p.cpi && p.cpi > 0 && (
            <div className={row}>
              <p>{'CPI: '}</p>
              <p>{`${p.cpi}`}</p>
            </div>
          )}
        </>
      ))}
    </TooltipWrapper>
  );
};
export default WalletValueOverTimeTooltip;
