import Link from 'next/link';

import UserPhoto from '@components/UserPhoto';
import { PADDING_TAILWIND } from '@constants/Globals';
import { getUser } from 'src/api/UserApi';

export default async function GlobalNav() {
  const linkStyle = 'h-full cursor-pointer';
  const USER_ID = 'lxiry2v1ochapzp';

  const user = await getUser(USER_ID);

  return (
    <div
      className={`flex h-24 w-full items-center justify-between ${PADDING_TAILWIND} bg-secondaryBlack`}
    >
      <Link href="/">
        <h1 className={`${linkStyle} text-3xl font-bold `}>{'FinanceStorm'}</h1>
      </Link>
      <Link href={`/user/${USER_ID}`}>
        <div className={`${linkStyle} flex cursor-pointer items-center`}>
          <h1 className="mr-3 text-xl font-semibold">{'Profil'}</h1>
          {user.photo && <UserPhoto photo={user.photo} alt={user.name} />}
        </div>
      </Link>
    </div>
  );
}
