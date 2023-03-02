import Link from 'next/link';

import UserPhoto from '@components/UserPhoto';
import { PADDING_TAILWIND } from '@constants/Globals';
import { getUser } from 'src/api/UserApi';

const Navbar = async () => {
  const user = await getUser();

  return (
    <div
      className={`flex h-20 w-full items-center justify-between ${PADDING_TAILWIND} fixed z-50 bg-tertiaryBlack`}
    >
      <Link href="/">
        <h1
          className="'h-full cursor-pointer' mt-1 text-4xl font-bold lg:text-5xl"
          style={{ fontFamily: 'BebasNeue-Regular' }}
        >
          <span className="text-yellow-400">{'Finance'}</span>
          {'Storm'}
        </h1>
      </Link>
      <Link href={`/user/${process.env.NEXT_PUBLIC_USER_ID}`}>
        <div className="flex h-full cursor-pointer items-center">
          <h1 className="mr-3 text-lg font-semibold">{'Profil'}</h1>
          {user.photo && <UserPhoto photo={user.photo} alt={user.name} />}
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
