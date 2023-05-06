import { ChevronRight } from 'lucide-react';
import { Route } from 'next';
import Link from 'next/link';

import { cn } from '@utils/misc';

const NavbarLink = <T extends string>({
  title,
  onClick,
  className,
  ...props
}: {
  title: string;
  className?: string;
  href: Route<T>;
  onClick?: () => void;
}) => (
  <Link
    {...props}
    className={cn(
      'flex w-full grow items-center justify-between border-b border-border py-3 sm:h-full sm:border-none sm:py-0',
      className,
    )}
  >
    <p className="w-max">{title}</p>
    <ChevronRight size={25} strokeWidth={1} className="sm:hidden" />
  </Link>
);

export default NavbarLink;
