'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { CgChevronRight } from 'react-icons/cg';

const MainRedirectButton = ({
  title,
  subtitle,
  image,
  href,
}: {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}) => {
  const [active, setActive] = useState(false);

  return (
    <Link
      href={href}
      onMouseOver={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
      className="relative h-full w-full cursor-pointer overflow-hidden border border-gray-500"
    >
      <Image
        src={image}
        alt={title}
        className="cursor-pointer object-cover object-left-top blur-10"
        fill
      />
      <div
        className={`absolute z-10 h-full w-full ${
          active ? 'bg-slate-800' : 'bg-slate-800/40'
        }`}
      />
      <div className="relative z-20 flex h-full w-full select-none flex-col">
        <div className="absolute top-45 flex w-full flex-col items-center justify-center px-2 lg:px-6">
          <p className="mb-1 text-center text-2xl font-extrabold leading-10">
            {title}
          </p>
          <p className="text-white/85 text-center">{subtitle}</p>
        </div>
        {active && (
          <div className="absolute bottom-10 flex w-full items-center justify-center">
            <p>{'Przejdź'}</p>
            <CgChevronRight size={20} color="rgba(255,255,255, 0.85)" />
          </div>
        )}
      </div>
    </Link>
  );
};

export default MainRedirectButton;
