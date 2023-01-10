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
      <div className="flex items-center">
        <PageTitle className="mr-3">{`Witaj, ${user.name}`}</PageTitle>
        {user.photo && <UserPhoto photo={user.photo} alt={user.name} />}
      </div>
      <div className="mt-5 mb-10 flex flex-col lg:flex-row">
        <div className="lg:mr-16">
          <UserBalance user={user} />
        </div>
        <div className="flex grow">
          <UserBalancePercentage user={user} />
        </div>
      </div>
      <div className="mt-10 flex w-full">
        <UserLastTransactions user={user} />
      </div>
      <div className="mt-10 flex w-full grow">
        <UserCurrencyPairSummary user={user} />
      </div>
    </div>
  );
};

export default User;
