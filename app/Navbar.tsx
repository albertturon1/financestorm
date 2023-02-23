import Link from 'next/link';

import UserPhoto from '@components/UserPhoto';
import { PADDING_TAILWIND } from '@constants/Globals';
import { getUser } from 'src/api/UserApi';
export const USER_ID = 'lxiry2v1ochapzp';

const Navbar = async () => {
  const linkStyle = 'h-full cursor-pointer';

  const user = await getUser(USER_ID);

  return (
    <div
      className={`flex h-20 w-full items-center justify-between ${PADDING_TAILWIND} fixed z-50 bg-tertiaryBlack`}
    >
      <Link href="/">
        <h1
          className={`${linkStyle} mt-1 text-5xl font-bold`}
          style={{ fontFamily: 'BebasNeue-Regular' }}
        >
          <span className="text-yellow-400">{'Finance'}</span>
          {'Storm'}
        </h1>
      </Link>
      <Link href={`/user/${USER_ID}`}>
        <div className={`${linkStyle} flex cursor-pointer items-center`}>
          <h1 className="mr-3 text-lg font-semibold">{'Profil'}</h1>
          {user.photo && <UserPhoto photo={user.photo} alt={user.name} />}
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
