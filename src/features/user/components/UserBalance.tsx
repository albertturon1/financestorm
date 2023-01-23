import todayWalletValue from '@features/walletHistory/tools/todayWalletValue';
import { User } from '@interfaces/models/IUser';

import UserBalanceCurrencies from './CurrencyBalancePercentage/UserBalanceCurrencies';

const UserBalance = async ({ user }: { user: User }) => {
  const { balance } = await todayWalletValue(user);

  return (
    <div className="flex w-96 flex-col">
      <p className="mb-2 font-semibold">{'Portfel'}</p>
      {/* @ts-expect-error Server Component */}
      <UserBalanceCurrencies user={user} />
      <div className="mt-3 flex w-full flex-col items-end border-t pt-3 pr-2">
        <p className="mb-1 text-sm font-semibold">
          {'Łączna wartość portfela'}
        </p>
        <p className="text-xl font-bold">{`${balance} PLN`}</p>
      </div>
    </div>
  );
};

export default UserBalance;
