import dynamic from 'next/dynamic';

import ClientScrollbars from '@components/ClientScrollbars';
import PageTitle from '@components/PageTitle';
import UserWalletBalances from '@components/UserWalletBalances';
import { PADDING_TAILWIND } from '@constants/Globals';
import inflationWalletOverTimeValue from '@features/walletHistory/tools/inflationWalletOverTimeValue';
import walletValueOverTime from '@features/walletHistory/tools/walletValueOverTime';
import { getUser } from '@src/api/UserApi';
import { CURRENCIES } from '@constants/Currencies';
import { getTodayCurrencyRatesQuery } from '@src/api/CurrenctyRateApi';
import queryClientSide from '@utils/queryClientSide';
import { use } from 'react';
import { getMonthlyCPI } from '@src/api/OECDApi';

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

  const data = await getMonthlyCPI({
    startPeriod: dailyWalletValues.startDate,
    endPeriod: dailyWalletValues.endDate
  })


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
