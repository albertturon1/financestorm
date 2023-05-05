import { Route } from 'next';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const NavbarLink = <T extends string>({
  title,
  onClick,
  ...props
}: {
  title: string;
  href: Route<T>;
  onClick?: () => void;
}) => (
  <Link
    {...props}
    className="flex w-full grow items-center justify-between border-b border-border py-3 sm:h-full sm:border-none sm:py-0"
  >
    <p className="w-max">{title}</p>
    <ChevronRight size={25} strokeWidth={1} className="sm:hidden" />
  </Link>
);

export default NavbarLink;
