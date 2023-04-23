import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AiOutlineLineChart } from 'react-icons/ai';

import PageTitle from '@components/PageTitle';
import UserPhoto from '@components/UserPhoto';
import WorkInProgress from '@components/WorkInProgress';
import { CHART_THEME } from '@constants/chart';
import { PADDING_TAILWIND } from '@constants/globals';
import UserBalancePercentage from '@features/user/components/currencyBalancePercentage/UserBalancePercentage';
import UserBalance from '@features/user/components/UserBalance';
// import UserCurrencyPairSummary from '@features/user/components/UserCurrencyPairSummary';
// import UserLastTransactions from '@features/user/components/UserLastTransactions';
import todayWalletValue from '@features/walletHistory/tools/todayWalletValue';
import { getUser } from 'src/api/UserApi';

export interface UserParams {
  id: string;
}

const User = async () => {
  const user = await getUser();
  if (!user) return null;
  if (!user.id) notFound();

  const walletValue = await todayWalletValue(user);
  // const transactions = await getUserCurrencyTransactions();

  return (
    <WorkInProgress />
    // <div className={`${PADDING_TAILWIND} flex h-full w-full flex-col pb-6`}>
    //   {/*Header */}
    //   <div className="flex items-center">
    //     <PageTitle className="mr-3">{`Witaj, ${user.name}`}</PageTitle>
    //     {user.photo && <UserPhoto photo={user.photo} alt={user.name} />}
    //   </div>
    //   {/*User balance*/}
    //   <div className="mt-1 lg:mt-3 mb-10 flex flex-col lg:flex-row">
    //     <div className="lg:mr-16">
    //       {/* @ts-expect-error Server Component */}
    //       <UserBalance user={user} />
    //       <Link href={`/user/${user.id}/wallet-history`}>
    //         <div className=" mt-3 mb-10 flex h-11 w-96 items-center justify-center gap-x-4 self-center rounded border border-gray-500 bg-gray-700 font-bold lg:mb-0">
    //           <p>{'Wartość portfela w czasie'}</p>
    //           <AiOutlineLineChart size={25} color={CHART_THEME[0]} />
    //         </div>
    //       </Link>
    //     </div>
    //     {!!walletValue && (
    //       <div className="flex grow mb-10 ">
    //         <UserBalancePercentage currencies={walletValue.currencies} />
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default User;
