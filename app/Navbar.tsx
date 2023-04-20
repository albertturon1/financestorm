import Link from 'next/link';

import PageMaxWidth from '@components/PageMaxWidth';
import PagePadding from '@components/PagePadding';
import UserPhoto from '@components/UserPhoto';
import { getUser } from 'src/api/UserApi';

const Navbar = async () => {
  const user = await getUser();

  return (
    <div className="sticky top-0 z-50 flex h-20 w-full border-b bg-[#b1acab]">
      <PageMaxWidth>
        <PagePadding flex>
          <div className="flex flex-1 items-center justify-between">
            <Link href="/">
              <h1
                className="'h-full cursor-pointer' mt-1 text-4xl font-bold tracking-wide text-background lg:text-5xl"
                style={{ fontFamily: 'BebasNeue-Regular' }}
              >
                <span className="text-navy">{'Finance'}</span>
                {'Storm'}
              </h1>
            </Link>
            {/* <Link href={`/user/${process.env.NEXT_PUBLIC_USER_ID ?? ''}`}>
              <div className="flex h-full cursor-pointer items-center">
                <h1 className="mr-3 text-lg font-semibold">{'Profil'}</h1>
                {user?.photo && (
                  <UserPhoto photo={user.photo} alt={user.name} />
                )}
              </div>
            </Link> */}
          </div>
        </PagePadding>
      </PageMaxWidth>
    </div>
  );
};

export default Navbar;
