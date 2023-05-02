import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const NavbarItems = ({ onItemClick }: { onItemClick?: () => void }) => (
  <div className="flex max-h-full flex-col sm:flex-row sm:gap-x-5 sm:text-[0.95rem] lg:gap-x-6">
    {/*homepage hidden on mobile */}
    <Link
      onClick={onItemClick}
      href="/"
      className="flex w-full grow items-center justify-between border-b border-border py-3 sm:hidden sm:h-full sm:border-none sm:py-0"
    >
      <p className="w-max">{'Homepage'}</p>
      <ChevronRight size={25} strokeWidth={1} className="sm:hidden" />
    </Link>
    <Link
      onClick={onItemClick}
      href="/currencies"
      className="flex w-full grow items-center justify-between border-b border-border py-3 sm:h-full sm:border-none sm:py-0"
    >
      <p className="w-max">{'Exchange rates'}</p>
      <ChevronRight size={25} strokeWidth={1} className="sm:hidden" />
    </Link>
    <Link
      onClick={onItemClick}
      href="/multi-currencies"
      className="flex w-full grow items-center justify-between border-b border-border py-3 sm:h-full sm:border-none sm:py-0"
    >
      <p className="w-max">{'Rates comparisons'}</p>
      <ChevronRight size={25} strokeWidth={1} className="sm:hidden" />
    </Link>
  </div>
);

export default NavbarItems;
