'use client';

import { PuffLoader } from 'react-spinners';

import useCurrentCurrencyRatesData from '@features/main/hooks/useCurrentCurrencyRatesData';
import Transactions from '@features/user/history/components/Transactions';
import { useUserCurrencyTransactionsQuery } from 'src/api/TransactionApi';

import useCreateTransaction from '../hooks/useCreateTransaction';
import useRealTimeTransactions from '../hooks/useRealTimeTransactions';

const RealTimeTransactions = () => {
  const { data: transactions, isLoading } = useUserCurrencyTransactionsQuery(
    {},
  );
  const [currencyRatesData] = useCurrentCurrencyRatesData();

  useCreateTransaction(currencyRatesData);
  const realTimeTransactions = useRealTimeTransactions(transactions);
  const unique = [
    ...new Map(realTimeTransactions.map((item) => [item.id, item])).values(),
  ];
  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center self-center p-10">
        <PuffLoader className="h-full w-full" color={'green'} />
      </div>
    );
  return <Transactions transactions={unique.slice(0, 10)} />;
};

export default RealTimeTransactions;
