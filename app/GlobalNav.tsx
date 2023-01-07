'use client';
import Link from 'next/link';

import { PADDING_TAILWIND } from '@constants/Globals';

export default function GlobalNav() {
  const linkStyle = 'h-full text-white';
  return (
    <div
      className={`flex h-16 w-full items-center justify-between bg-secondaryBlack py-0 ${PADDING_TAILWIND}`}
    >
      <Link href="/">
        <h1 className={`${linkStyle} text-3xl font-bold `}>
          {'FinanaceStorm'}
        </h1>
      </Link>
      <Link href="/currencyRates">
        <h1 className={linkStyle}>{'Wyloguj'}</h1>
      </Link>
    </div>
  );
}
