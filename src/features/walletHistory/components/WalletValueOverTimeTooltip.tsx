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
}: TooltipProps<number, string>): ReactElement | null => {
  if (!active || !payload?.length) return null;
  const row = 'mb-1 flex items-center  gap-x-2';
  return (
    <TooltipWrapper>
      <p className="pb-2">{`Dzień: ${payload[0].payload.label}`}</p>
      {payload.map(({ payload: p }, index) => (
        <>
          <div className={row} style={{ color: CHART_THEME[index] }}>
            {/*eslint-disable-next-line @typescript-eslint/restrict-template-expressions*/}
            <p>{`${payload[index].name}:`}</p>
            <p>{p.value}</p>
          </div>
          {!!p.inflationPercentage && (
            <div className={row}>
              <p>{'Skumulowana inflacja: '}</p>
              <p>{`${p.inflationPercentage}%`}</p>
            </div>
          )}
          {!!p.inflationLoss && (
            <div className={row}>
              <p>{'Utrata wartości: '}</p>
              <p>{`${p.inflationLoss}`}</p>
            </div>
          )}
        </>
      ))}
    </TooltipWrapper>
  );
};
export default WalletValueOverTimeTooltip;
