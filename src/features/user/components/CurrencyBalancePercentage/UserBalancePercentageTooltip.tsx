import { TooltipProps } from 'recharts';

import FlagCountryCode from '@components/FlagCountryCode';
import { Currencies } from '@interfaces/ICurrency';

const UserBalancePercentageTooltip = ({
  active,
  payload,
  current_currency,
}: TooltipProps<number, string> & {
  current_currency: Currencies;
}) => {
  if (!active) return null;
  return (
    <div className="gap-y-3 rounded border border-slate-50 bg-secondaryBlack p-4">
      <div className="flex gap-x-2">
        <p className="font-semibold">{payload[0].payload.value}</p>
        <FlagCountryCode
          reverse
          code={payload[0].payload.currency}
          flagClassName="w-4"
        />
      </div>
      {payload[0].payload.currency !== current_currency && (
        <p className="font-semibold">{`${payload[0].payload.current_currency_value} PLN`}</p>
      )}
      <p className="font-semibold">{`${payload[0].payload.percentage}% portfela`}</p>
    </div>
  );
};

export default UserBalancePercentageTooltip;
