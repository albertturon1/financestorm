import Link from 'next/link';

import PageMaxWidth from '@components/PageMaxWidth';
import PagePadding from '@components/PagePadding';

const Navbar = () => (
  <div className="sticky top-0 z-50 flex h-[4.5rem] w-full border-b bg-dark_pale lg:h-20">
    <PageMaxWidth>
      <PagePadding flex>
        <div className="flex flex-1 items-center justify-between">
          <Link href="/">
            <h1
              className="'h-full cursor-pointer' mt-1 text-4xl font-bold tracking-wide text-background lg:text-5xl"
              style={{ fontFamily: 'BebasNeue-Regular' }}
            >
              <span className="text-dark_navy">{'Finance'}</span>
              {'Storm'}
            </h1>
          </Link>
        </div>
      </PagePadding>
    </PageMaxWidth>
  </div>
);

export default Navbar;
