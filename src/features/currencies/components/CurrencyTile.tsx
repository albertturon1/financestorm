'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import FlagCountryCode from '@components/misc/FlagCountryCode';
import { Currency } from '@interfaces/ICurrency';
import { cutNumber, inverseCurrecyRate } from '@utils/misc';

const CurrencyTile = ({
  quoteCurrency,
  baseCurrency,
  rate,
  className,
}: {
  quoteCurrency: Currency;
  baseCurrency: Currency;
  rate: number;
  className: string;
}) => (
  <Link href={`/currencies/${baseCurrency}-${quoteCurrency}`}>
    <div
      className={twMerge(
        'flex items-center justify-between gap-x-4 px-4 py-4',
        className,
      )}
    >
      <FlagCountryCode code={baseCurrency} />
      <div className="flex">
        <p>{`${cutNumber(
          inverseCurrecyRate(rate),
          4,
        )} ${quoteCurrency.toUpperCase()}`}</p>
        <ChevronRight size={25} strokeWidth={1} className="-mr-2" />
      </div>
    </div>
  </Link>
);

export default CurrencyTile;
