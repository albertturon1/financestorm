import dynamic from 'next/dynamic';

import SkeletonLoader from '@components/ui/SkeletonLoader';
import {
  DEFAULT_BASE_CURRENCIES,
  DEFAULT_QUOTE_CURRENCY,
} from '@constants/currencies';

import NavbarLink from './NavbarLink';
const NavbarWalletLink = dynamic(() => import('./NavbarWalletLink'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center">
      <SkeletonLoader className="h-6 w-24" />
    </div>
  ),
});

const NavbarItems = (props: { onClick?: () => void }) => (
  <div className="flex max-h-full flex-col sm:flex-row sm:gap-x-5 sm:text-[0.95rem] lg:gap-x-6">
    {/*homepage hidden on mobile */}
    <NavbarLink {...props} title="Homepage" href="/" className="sm:hidden" />
    <NavbarLink {...props} title="Exchange rates" href="/currencies" />
    <NavbarLink
      {...props}
      title="Rates comparisons"
      href={`/multi-currencies?quote=${DEFAULT_QUOTE_CURRENCY}&base=${DEFAULT_BASE_CURRENCIES.join(
        ',',
      )}`}
    />
    {/* to prevent hydration error  */}
    <NavbarWalletLink {...props} />
  </div>
);

export default NavbarItems;
