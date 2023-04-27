import Link from 'next/link';

import PageMaxWidth from '@components/misc/PageMaxWidth';
import PagePadding from '@components/misc/PagePadding';

const Navbar = () => (
  <div className="sticky top-0 z-50 flex h-16 w-full border-b bg-dark_pale lg:h-[4.75rem]">
    <PageMaxWidth>
      <PagePadding flex>
        <div className="flex flex-1 items-center justify-between">
          <Link href="/">
            <h1 className="mt-1 h-full cursor-pointer font-bebas_neue text-3xl font-bold tracking-wide text-background lg:text-4xl">
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
