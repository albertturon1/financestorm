import { User } from 'app/user/[id]/page';
import { getUserCurrencyTransactions } from 'src/api/UserApi';

import Transactions from '../history/components/Transactions';

const UserLastTransactions = async ({ user }: { user: User }) => {
  const transactions = await getUserCurrencyTransactions(undefined, user.id);

  if (!transactions.items.length) return null;
  return (
    <div className="flex w-full flex-col">
      <p className="mb-3 font-bold underline">{'Ostatnie transakcje'}</p>
      <Transactions transactions={transactions.items} baseCurrency="pln" />
    </div>
  );
};

export default UserLastTransactions;
