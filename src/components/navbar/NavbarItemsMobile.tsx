import PagePadding from '@components/misc/PagePadding';
import { cn } from '@utils/misc';

import NavbarItems from './NavbarItems';

const NavbarItemsMobile = ({
  onItemClick,
  open,
}: {
  open: boolean;
  onItemClick: () => void;
}) => (
  <div
    className={cn(
      'fixed sm:hidden',
      open
        ? 'fixed bottom-0 left-0 right-0 top-[4rem] z-30 flex flex-col bg-background lg:top-[4.75rem]'
        : 'hidden',
    )}
  >
    <PagePadding>
      <div className="flex flex-col gap-y-2 py-10">
        <h1 className="font-semibold text-xl">{'Tools'}</h1>
        <NavbarItems onItemClick={onItemClick} />
      </div>
    </PagePadding>
  </div>
);

export default NavbarItemsMobile;
