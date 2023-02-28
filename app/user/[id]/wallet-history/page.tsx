import ClientScrollbars from '@components/ClientScrollbars';
import PageTitle from '@components/PageTitle';
import UserWalletBalances from '@components/UserWalletBalances';
import { PADDING_TAILWIND } from '@constants/globals';
import WalletOverTimeCharts from '@features/walletHistory/components/WalletOverTimeCharts';
import inflationWalletOverTimeValue from '@features/walletHistory/tools/inflationWalletOverTimeValue';
import walletValueOverTime from '@features/walletHistory/tools/walletValueOverTime';
import { getUser } from '@src/api/UserApi';

import { UserParams } from '../page';

const WalletHistoryPage = async ({ params }: { params: UserParams }) => {
  const { id } = params;
  const user = await getUser(id);
  const dailyWalletValues = await walletValueOverTime({
    currencies: user.currencies,
    quote_currency: user.quote_currency,
    years: 1,
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
      <div className="flex w-full flex-col justify-between pb-1">
        <PageTitle className="w-full justify-between pb-1">
          {'Wartość portfela walutowego na przestrzeni lat'}
        </PageTitle>
        <ClientScrollbars className="flex-row">
          {/* @ts-expect-error Server Component */}
          <UserWalletBalances
            userID={user.id}
            containerClassName="flex-row w-max"
            itemClassName="py-1.5 w-48"
            onlyBalance
          />
        </ClientScrollbars>
      </div>
      <WalletOverTimeCharts chartData={chartData} />
    </div>
  );
};

export default WalletHistoryPage;
