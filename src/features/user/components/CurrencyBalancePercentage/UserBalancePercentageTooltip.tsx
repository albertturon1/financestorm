import { TooltipProps } from 'recharts';

import FlagCountryCode from '@components/FlagCountryCode';
import {
  BaseCurrencyWalletValue,
  isBaseCurrencyWalletValue,
} from '@features/walletHistory/tools/todayWalletValue';
import { CustomTooltipProps } from '@interfaces/ICharts';

const UserBalancePercentageTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  const [data] = payload as [CustomTooltipProps<BaseCurrencyWalletValue>];
  const { payload: p } = data;

  return (
    <div className="gap-y-3 rounded border border-slate-50 bg-secondaryBlack p-4">
      <div className="flex gap-x-2">
        <p className="font-semibold">{p.amount}</p>
        <FlagCountryCode reverse code={p.currency} flagClassName="w-4" />
      </div>
      {isBaseCurrencyWalletValue(p) && (
        <p className="font-semibold">{`${p.value} PLN`}</p>
      )}
      <p className="font-semibold">{`${p.percentage}% portfela`}</p>
    </div>
  );
};

export default UserBalancePercentageTooltip;
