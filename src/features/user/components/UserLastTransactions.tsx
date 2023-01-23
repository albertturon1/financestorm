import { Record } from 'pocketbase';

import Transactions from '../history/components/Transactions';

const UserCurrencyPairSummary = ({
  transactions,
}: {
  transactions: Record[];
}) => {
  if (!transactions.length) return null;
  return (
    <div className="flex w-full flex-col">
      <p className="mb-4 font-semibold underline">{'Ostatnie transakcje'}</p>
      <Transactions transactions={transactions} baseCurrency="pln" />
    </div>
  );
};

export default UserCurrencyPairSummary;
