import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageTitle from '@components/PageTitle';
import UserPhoto from '@components/UserPhoto';
import { PADDING_TAILWIND } from '@constants/Globals';
import UserBalancePercentage from '@features/user/components/CurrencyBalancePercentage/UserBalancePercentage';
import UserBalance from '@features/user/components/UserBalance';
import UserLastTransactions from '@features/user/components/UserLastTransactions';
import { getUser } from 'src/api/UserApi';

export interface UserParams {
  id: string;
}

const User = async ({ params }: { params: UserParams }) => {
  const user = await getUser(params.id);
  if (!user.id) notFound();

  return (
    <div
      className={`${PADDING_TAILWIND} w-full overflow-hidden bg-primaryBlack pb-10`}
    >
      {/*Header */}
      <div className="flex items-center">
        <PageTitle className="mr-3">{`Witaj, ${user.name}`}</PageTitle>
        {user.photo && <UserPhoto photo={user.photo} alt={user.name} />}
      </div>
      {/*User balance*/}
      <div className="mt-5 mb-10 flex flex-col lg:flex-row">
        <div className="lg:mr-16">
          {/* @ts-expect-error Server Component */}
          <UserBalance user={user} />
          <Link href={`/user/${user.id}/wallet-history`}>
            <p className=" mt-3 flex h-10 items-center justify-center self-center rounded border bg-gray-600 font-bold">
              {'Wartość portfela w czasie (Wykres)'}
            </p>
          </Link>
        </div>
        <div className="flex grow">
          <UserBalancePercentage user={user} />
        </div>
      </div>
      <div className="mt-10">
        {/* @ts-expect-error Server Component */}
        <UserLastTransactions user={user} />
      </div>
      {/*<div className="mt-10">
        <UserCurrencyPairSummary user={user} />
      </div>*/}
    </div>
  );
};

export default User;
