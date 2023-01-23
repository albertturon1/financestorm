import PageTitle from '@components/PageTitle';
import { PADDING_TAILWIND } from '@constants/Globals';
import UserBalanceCurrencies from '@features/user/components/CurrencyBalancePercentage/UserBalanceCurrencies';
import InflationOverMonthsLineChart from '@features/walletHistory/components/InflationOverMonthsLineChart';
import WalletValueOverTimeLineChart from '@features/walletHistory/components/WalletValueOverTimeLineChart';
import inflationWalletOverTimeValue from '@features/walletHistory/tools/inflationWalletOverTimeValue';
import walletValueOverTime from '@features/walletHistory/tools/walletValueOverTime';
import { RechartsMultiData } from '@interfaces/ICharts';
import { getUser } from '@src/api/UserApi';

import { UserParams } from '../page';

const WalletHistoryPage = async ({ params }: { params: UserParams }) => {
  const { id } = params;
  const user = await getUser(id);
  const dailyWalletValue = await walletValueOverTime({
    user_currencies: user.currencies,
    quote_currency: user.current_currency,
    years: 1,
  });

  const inflationDailyWalletValue = await inflationWalletOverTimeValue(
    dailyWalletValue,
  );

  const inflationData: RechartsMultiData = {
    name: 'Realna wartość portfela',
    data: inflationDailyWalletValue,
  };

  const chartData: RechartsMultiData[] = [
    {
      name: 'Wartość portfela',
      data: dailyWalletValue.rates,
    },
    inflationData,
  ];

  return (
    <div className={`${PADDING_TAILWIND} flex h-full w-full flex-col pb-4`}>
      <div className="flex w-full justify-between">
        <PageTitle className="w-full justify-between pb-5 pr-7">
          {'Wartość portfela na przestrzeni lat'}
        </PageTitle>
        {/* @ts-expect-error Server Component */}
        <UserBalanceCurrencies
          containerClassName="pr-8"
          itemClassName="border border-slate-600"
          horizontal
          user={user}
          accountID={false}
          baseValue={false}
        />
      </div>
      <div className="h-3/4">
        <WalletValueOverTimeLineChart data={chartData} />
      </div>
      <div className="h-1/4 w-full">
        <InflationOverMonthsLineChart data={inflationData.data} />
      </div>
    </div>
  );
};

export default WalletHistoryPage;
