import Link from 'next/link';

import PageTitle from '@components/PageTitle';
import UserPhoto from '@components/UserPhoto';
import { PADDING_TAILWIND } from '@constants/Globals';
import UserBalancePercentage from '@features/user/components/CurrencyBalancePercentage/UserBalancePercentage';
import UserBalance from '@features/user/components/UserBalance';
import UserCurrencyPairSummary from '@features/user/components/UserCurrencyPairSummary';
import UserLastTransactions from '@features/user/components/UserLastTransactions';
import { CurrencyCodes } from '@interfaces/ICurrency';
import { getUser } from 'src/api/UserApi';

export interface User {
  id: string;
  created: Date;
  updated: Date;
  name: string;
  email: string;
  pln: number;
  chf: number;
  eur: number;
  usd: number;
  gbp: number;
  pln_id: string;
  chf_id: string;
  eur_id: string;
  usd_id: string;
  gbp_id: string;
  current_currency: CurrencyCodes;
  verified?: boolean;
  avatar?: string;
  photo?: string;
}

export interface UserParams {
  id: string;
}

const User = async ({ params }: { params: UserParams }) => {
  const user = await getUser(params.id);
  return (
    <div className={`${PADDING_TAILWIND} h-full w-full pb-10`}>
      {/*Header */}
      <div className="flex items-center">
        <PageTitle className="mr-3">{`Witaj, ${user.name}`}</PageTitle>
        {user.photo && <UserPhoto photo={user.photo} alt={user.name} />}
        <Link
          href={`/user/${user.id}/wallet-history`}
          className="ml-40 font-bold bg-red-300"
        >
          <p>{'Portfel w czasie'}</p>
        </Link>
      </div>
      {/*User balance*/}
      <div className="flex flex-col mt-5 mb-10 lg:flex-row">
        <div className="lg:mr-16">
          <UserBalance user={user} />
        </div>
        <div className="flex grow">
          <UserBalancePercentage user={user} />
        </div>
      </div>
      <div className="flex w-full mt-10">
        <UserLastTransactions user={user} />
      </div>
      <div className="flex w-full mt-10 grow">
        <UserCurrencyPairSummary user={user} />
      </div>
    </div>
  );
};

export default User;
