'use client';

import Loader from '@components/Loader';
import PageTitle from '@components/PageTitle';
import { PADDING_TAILWIND } from '@constants/Globals';
import useDailyCurrencyRatesData from '@features/currencies/hooks/useDailyCurrencyRatesData';
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

  const quoteCurrency = 'pln';

  const { data: monthlyInflation } = useMonthlyInflationRatesQuery({
    startPeriod: '2014-01',
    endPeriod: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
  });

  const monthlyInflationNormalized = useMonthlyInflationData(monthlyInflation);

  //const [gbp_monthly] = useMonthlyCurrencyRatesData({
  //  baseCurrency: 'gbp',
  //  quoteCurrency,
  //});
  //const [usd_monthly] = useMonthlyCurrencyRatesData({
  //  baseCurrency: 'usd',
  //  quoteCurrency,
  //});
  //const [chf_monthly] = useMonthlyCurrencyRatesData({
  //  baseCurrency: 'chf',
  //  quoteCurrency,
  //});
  //const [eur_monthly] = useMonthlyCurrencyRatesData({
  //  baseCurrency: 'eur',
  //  quoteCurrency,
  //});
  const [gbp_daily] = useDailyCurrencyRatesData({
    baseCurrency: 'gbp',
    quoteCurrency,
  });
  const [usd_daily] = useDailyCurrencyRatesData({
    baseCurrency: 'usd',
    quoteCurrency,
  });
  const [chf_daily] = useDailyCurrencyRatesData({
    baseCurrency: 'chf',
    quoteCurrency,
  });
  const [eur_daily] = useDailyCurrencyRatesData({
    baseCurrency: 'eur',
    quoteCurrency,
  });

  //const monthlyWalletValue = useGetWalletValueOverTime({
  //  gbp: gbp_monthly?.data,
  //  eur: eur_monthly?.data,
  //  usd: usd_monthly?.data,
  //  chf: chf_monthly?.data,
  //  user,
  //  monthlyInflationNormalized,
  //});
  const dailyWalletValue = useGetWalletValueOverTime({
    gbp: gbp_daily?.data,
    eur: eur_daily?.data,
    usd: usd_daily?.data,
    chf: chf_daily?.data,
    user,
    monthlyInflationNormalized,
  });

  return (
    <div className={`${PADDING_TAILWIND} flex flex-1 flex-col`}>
      <PageTitle className="pb-5">
        {'Wartość portfela na przestrzeni lat'}
      </PageTitle>
      {dailyWalletValue.length ? (
        <div className="h-screen w-full pb-40">
          <DailyWalletLineChart data={dailyWalletValue} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default WalletHistoryPage;
