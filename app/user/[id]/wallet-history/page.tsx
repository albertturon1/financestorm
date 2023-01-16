'use client';

import Loader from '@components/Loader';
import PageTitle from '@components/PageTitle';
import { PADDING_TAILWIND } from '@constants/Globals';
import useMonthlyCurrencyRatesData from '@features/currencies/hooks/useMonthlyCurrencyRatesData';
import useMonthlyInflationData from '@features/currencies/hooks/useMonthlyInflationData';
import useGetWalletValueOverTime from '@hooks/useGetWalletValueOverTime';
import { useMonthlyInflationRatesQuery } from '@src/api/OECDApi';
import useFetch from '@utils/reactQuery/useFetch';

import { User, UserParams } from '../page';
import DailyWalletLineChart from './components/DailyWalletLineChart';

const useUserQuery = (id: string) =>
  useFetch<User>({
    url: `http://127.0.0.1:8090/api/collections/user/records/${id}`,
    key: ['user'],
  });

const WalletHistoryPage = ({ params }: { params: UserParams }) => {
  const { id } = params;
  const { data: user } = useUserQuery(id);

  const { data: monthlyInflation } = useMonthlyInflationRatesQuery({
    startPeriod: '2014-01',
    endPeriod: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
  });

  const monthlyInflationNormalized = useMonthlyInflationData(monthlyInflation);

  const [gbp] = useMonthlyCurrencyRatesData({
    baseCurrency: 'gbp',
    quoteCurrency: 'pln',
  });
  const [usd] = useMonthlyCurrencyRatesData({
    baseCurrency: 'usd',
    quoteCurrency: 'pln',
  });
  const [chf] = useMonthlyCurrencyRatesData({
    baseCurrency: 'chf',
    quoteCurrency: 'pln',
  });
  const [eur] = useMonthlyCurrencyRatesData({
    baseCurrency: 'eur',
    quoteCurrency: 'pln',
  });

  const monthlyWalletValue = useGetWalletValueOverTime({
    gbp: gbp?.data,
    eur: eur?.data,
    usd: usd?.data,
    chf: chf?.data,
    user,
    monthlyInflationNormalized,
  });

  return (
    <div className={`${PADDING_TAILWIND} flex flex-1 flex-col`}>
      <PageTitle className="py-5">
        {'Wartość portfela na przestrzeni lat'}
      </PageTitle>
      {monthlyWalletValue.length ? (
        <div className="w-full h-screen pb-40">
          <DailyWalletLineChart data={monthlyWalletValue} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default WalletHistoryPage;
