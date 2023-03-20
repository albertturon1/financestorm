import dynamic from 'next/dynamic';

import ClientScrollbars from '@components/ClientScrollbars';
import PageTitle from '@components/PageTitle';
import UserWalletBalances from '@components/userWalletBalances';
import { PADDING_TAILWIND } from '@constants/globals';
// import inflationWalletOverTimeValue from '@features/walletHistory/tools/inflationWalletOverTimeValue';
import walletValueOverTime from '@features/walletHistory/tools/walletValueOverTime';
import { getUser } from '@src/api/UserApi';

const WalletOverTimeCharts = dynamic(
  () => import('@features/walletHistory/components/WalletOverTimeCharts'),
);

const WalletHistoryPage = async () => {
  const user = await getUser();
  if (!user) return null;

  const dailyWalletValues = await walletValueOverTime({
    currencies: user.currencies,
    quote_currency: user.quote_currency,
    years: 1,
  });

  // const inflationDailyWalletValue = await inflationWalletOverTimeValue(
  //   dailyWalletValues,
  // );
  const chartData = [
    {
      name: 'Wartość portfela',
      data: dailyWalletValues.values,
    },
    // {
    //   name: 'Realna wartość portfela',
    //   data: inflationDailyWalletValue,
    // },
  ] as const;

  return (
    <div className={`${PADDING_TAILWIND} flex h-full w-full flex-col pb-4`}>
      <PageTitle className="pb-3">
        {'Wartość portfela walutowego na przestrzeni lat'}
      </PageTitle>
      <ClientScrollbars className="flex-row">
        {/* @ts-expect-error Server Component */}
        <UserWalletBalances
          containerClassName="flex-row w-max"
          itemClassName="py-1.5 w-48"
          onlyBalance
        />
      </ClientScrollbars>
      <WalletOverTimeCharts chartData={chartData} />
    </div>
  );
};

export default WalletHistoryPage;
