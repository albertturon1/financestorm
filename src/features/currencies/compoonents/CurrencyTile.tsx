'use client';

import Link from 'next/link';

import FlagCountryCode from '@components/FlagCountryCode';
import { Currencies } from '@interfaces/ICurrency';
import { cutNumber } from '@utils/misc';

const CurrencyTile = ({
  baseCurrency,
  quoteCurrency,
  rate,
}: {
  baseCurrency: Currencies;
  quoteCurrency: Currencies;
  rate: number;
}) => (
  <Link href={`/currencies/${baseCurrency.toLowerCase()}/${quoteCurrency.toLowerCase()}`}>
    <div className="flex items-center px-4 py-2 border-gray-500 rounded-lg gap-x-4 bg-secondaryBlack">
      <FlagCountryCode code={baseCurrency.toUpperCase()} />
      <p className="text-lg font-semibold">
        {`${cutNumber(rate)}${quoteCurrency.toUpperCase()}`}
      </p>
    </div>
  </Link>
);

export default CurrencyTile;
