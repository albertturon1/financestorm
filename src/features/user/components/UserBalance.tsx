import UserWalletBalances from '@components/UserWalletBalances';
import todayWalletValue from '@features/walletHistory/tools/todayWalletValue';
import { UserModel } from '@interfaces/models/IUser';

const UserBalance = async ({ user }: { user: UserModel }) => {
  const { balance } = await todayWalletValue(user);

  return (
    <div className="flex w-96 flex-col">
      <p className="mb-2 font-semibold">{'Portfel'}</p>
      {/* @ts-expect-error Server Component */}
      <UserWalletBalances />
      <div className="mt-3 flex w-full flex-col items-end pr-2">
        <p className="mb-1 text-sm font-semibold">
          {'Łączna wartość portfela'}
        </p>
        <p className="text-xl font-bold">{`${balance} PLN`}</p>
      </div>
    </div>
  );
};

export default UserBalance;
