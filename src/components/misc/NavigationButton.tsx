import { ReactNode } from 'react';

import { ChevronRight } from 'lucide-react';
import { Route } from 'next';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

const NavigationButton = <T extends string>({
  children,
  className,
  href,
}: {
  children?: ReactNode;
  className?: string;
  href: Route<T>;
}) => (
  <Link
    href={href}
    className={twMerge(
      'flex h-full min-h-[40px] w-max items-center justify-end pl-1 text-electric_blue xs:pl-2 sm:gap-x-1',
      className,
    )}
  >
    {children}
    {/* -mr-2 to remove excessive padding from icon */}
    <ChevronRight size={25} strokeWidth={1} className="-mr-2" />
  </Link>
);

export default NavigationButton;
