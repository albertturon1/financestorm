import dynamic from 'next/dynamic';

import { PADDING_TAILWIND } from '@constants/Globals';
import inflationWalletOverTimeValue from '@features/walletHistory/tools/inflationWalletOverTimeValue';
import walletValueOverTime from '@features/walletHistory/tools/walletValueOverTime';
import { getUser } from '@src/api/UserApi';

const WalletOverTimeCharts = dynamic(
  () => import('@features/walletHistory/components/WalletOverTimeCharts'),
);

const WalletHistoryPage = async () => {
  const user = await getUser();
  const dailyWalletValues = await walletValueOverTime({
    currencies: user.currencies,
    quote_currency: user.quote_currency,
    years: 10,
  });

  const inflationDailyWalletValue = await inflationWalletOverTimeValue(
    dailyWalletValues,
  );

  const chartData = [
    {
      name: 'Wartość portfela',
      data: dailyWalletValues.values,
    },
    {
      name: 'Realna wartość portfela',
      data: inflationDailyWalletValue,
    },
  ] as const;

  return (
    <div className={`${PADDING_TAILWIND} flex h-full w-full flex-col pb-4`}>
      <WalletOverTimeCharts chartData={chartData} />
    </div>
  );
};

export default WalletHistoryPage;
