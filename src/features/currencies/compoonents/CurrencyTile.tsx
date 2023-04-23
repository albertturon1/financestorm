'use client';

import Link from 'next/link';

import FlagCountryCode from '@components/FlagCountryCode';
import { Currency, CurrenciesPair } from '@interfaces/ICurrency';

const CurrencyTile = ({
  currenciesPair,
  rate,
}: {
  currenciesPair: CurrenciesPair;
  rate: number;
}) => {
  const [base, quote] = (currenciesPair as string).split('-') as [
    Currency,
    Currency,
  ];
  return (
    <Link href={`/currencies/${base.toLowerCase()}-${quote.toLowerCase()}`}>
      <div className="flex items-center justify-between gap-x-4 rounded-lg border-gray-500 bg-secondaryBlack px-4 py-2">
        <FlagCountryCode code={base} />
        <div className="flex text-lg font-semibold">
          <p>{`${rate} ${quote.toUpperCase()}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default CurrencyTile;
