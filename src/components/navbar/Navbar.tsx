'use client';

import { useState } from 'react';

import { Bebas_Neue } from 'next/font/google';
import Link from 'next/link';

import PageMaxWidth from '@components/misc/PageMaxWidth';
import PagePadding from '@components/misc/PagePadding';
import useScrollDirection from '@components/navbar/hooks/useScrollDirection';

import { useCloseNavbar } from './hooks/useCloseNavbar';
import NavbarItems from './NavbarItems';
import NavbarItemsMobile from './NavbarItemsMobile';
import NavbarMenuButton from './NavbarMenuButton';

export const bebas_neue = Bebas_Neue({
  weight: '400',
  subsets: ['latin-ext'],
  preload: true,
});

export const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const [open, setOpen] = useState(false);

  //hide menu when screen resizes over sm
  useCloseNavbar(open, setOpen);
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
              <h1
                className={`mt-1 h-full cursor-pointer text-[1.75rem] font-bold tracking-wide ${bebas_neue.className}`}
              >
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
