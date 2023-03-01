'use client';

import Link from 'next/link';

import FlagCountryCode from '@components/FlagCountryCode';
import { Currencies, CurrenciesPair } from '@interfaces/ICurrency';
import { cutNumber } from '@utils/misc';

const CurrencyTile = ({
  currenciesPair,
  rate,
}: {
  currenciesPair: CurrenciesPair;
  rate: number;
}) => {
  const [base, quote] = currenciesPair.split('-') as [Currencies, Currencies];
  return (
    <Link href={`/currencies/${base.toLowerCase()}-${quote.toLowerCase()}`}>
      <div className="flex items-center gap-x-4 rounded-lg border-gray-500 bg-secondaryBlack px-4 py-2">
        <FlagCountryCode code={base} />
        <p className="text-lg font-semibold">
          {`${cutNumber(rate)}${quote.toUpperCase()}`}
        </p>
      </div>
    </Link>
  );
};

export default CurrencyTile;
