import { ReactNode } from 'react';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

const CurrencyRatesListButton = ({
  children,
  className,
  href,
}: {
  children?: ReactNode;
  className?: string;
  href: Partial<URL>;
}) => (
  <Link
    href={href}
    className={twMerge(
      'mt-1 flex h-full w-full items-center justify-end gap-x-1 pr-1 text-electric_blue xs:pr-2 sm:pr-3',
      className,
    )}
  >
    {children}
    <ChevronRight size={25} strokeWidth={1} />
  </Link>
);

export default CurrencyRatesListButton;
