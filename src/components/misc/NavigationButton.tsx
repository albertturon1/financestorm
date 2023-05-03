import { UrlObject } from 'url';

import { ReactNode } from 'react';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

const NavigationButton = ({
  children,
  className,
  href,
}: {
  children?: ReactNode;
  className?: string;
  href: UrlObject | __next_route_internal_types__.RouteImpl<UrlObject>;
}) => (
  <Link
    href={href}
    className={twMerge(
      'flex h-full w-max items-center justify-end pl-1 text-electric_blue xs:pl-2 sm:gap-x-1',
      className,
    )}
  >
    {children}
    {/* -mr-2 to remove excessive padding from icon */}
    <ChevronRight size={25} strokeWidth={1} className="-mr-2" />
  </Link>
);

export default NavigationButton;
