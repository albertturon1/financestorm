'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import PageMaxWidth from '@components/misc/PageMaxWidth';
import PagePadding from '@components/misc/PagePadding';
import useScrollDirection from '@components/navbar/hooks/useScrollDirection';
import useWindowSize from '@hooks/useWindowSize';

import NavbarItems from './NavbarItems';
import NavbarItemsMobile from './NavbarItemsMobile';
import NavbarMenuButton from './NavbarMenuButton';

export const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const [open, setOpen] = useState(false);
  const { screenWidth } = useWindowSize();

  //hide menu when screen resizes over sm
  useEffect(() => {
    if (screenWidth >= 640) setOpen(false);
  }, [screenWidth]);

  return (
    <div
      className={`sticky top-0 z-50 flex h-16 w-full border-b bg-background transition-all duration-500 lg:h-[4.75rem] ${
        scrollDirection === 'down' ? '-top-16 lg:-top-[4.75rem]' : 'top-0'
      }`}
    >
      <PageMaxWidth>
        <PagePadding flex>
          <div className="flex flex-1 items-center justify-between">
            <Link href="/">
              <h1 className="mt-1 h-full cursor-pointer font-bebas_neue text-[1.75rem] font-bold tracking-wide">
                {'FinanceStorm'}
              </h1>
            </Link>
            <NavbarMenuButton
              open={open}
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            />
            <NavbarItemsMobile
              open={open}
              onClick={() => {
                setOpen(false);
              }}
            />
            {/* items hidden on mobile */}
            <div className="hidden h-full sm:flex">
              <NavbarItems />
            </div>
          </div>
        </PagePadding>
      </PageMaxWidth>
    </div>
  );
};
