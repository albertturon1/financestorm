import dynamic from 'next/dynamic';

import SkeletonLoader from '@components/ui/SkeletonLoader';

import NavbarLink from './NavbarLink';
const NavbarWalletLink = dynamic(() => import('./NavbarWalletLink'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-20 items-center">
      <SkeletonLoader className="h-6 w-24" />
    </div>
  ),
});

const NavbarItems = (props: { onClick?: () => void }) => (
  <div className="flex max-h-full flex-col sm:flex-row sm:gap-x-5 sm:text-[0.95rem] lg:gap-x-6">
    {/*homepage hidden on mobile */}
    <NavbarLink {...props} title="Homepage" href="/" className="sm:hidden" />
    <NavbarLink {...props} title="Exchange rates" href="/currencies" />
    <NavbarLink {...props} title="Rates comparisons" href="/multi-currencies" />
    {/* to prevent hydration error  */}
    <NavbarWalletLink />
  </div>
);

export default NavbarItems;
