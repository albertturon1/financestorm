import { User } from '@interfaces/models/IUser';
import { getUserCurrencyTransactions } from 'src/api/UserApi';

import { useCurrencyPairSummary } from '../hooks/useCurrencyPairSummary';
import CurrencyPairSummary from './CurrencyPairSummary';

const UserCurrencyPairSummary = async ({ user }: { user: User }) => {
  const transactions = await getUserCurrencyTransactions(undefined, user.id);

  const currrencyPairSummary = useCurrencyPairSummary(transactions);

  if (!currrencyPairSummary.length) return null;
  return (
    <div className="flex w-full flex-col">
      <p className="mb-3 font-bold underline">
        {'Podusmowanie transferów walutowych'}
      </p>
      <CurrencyPairSummary
        summary={currrencyPairSummary.sort((a, b) =>
          a.appearance < b.appearance ? 1 : -1,
        )}
      />
    </div>
  );
};

export default UserCurrencyPairSummary;
