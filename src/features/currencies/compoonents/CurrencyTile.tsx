'use client';

import Link from 'next/link';

import FlagCountryCode from '@components/FlagCountryCode';
import { Currencies } from '@interfaces/ICurrency';
import { cutNumber } from '@utils/misc';

export type CurrencyTileRates = {
  baseCurrency: Currencies;
  rate: number;
};

const CurrencyTile = ({
  baseCurrency,
  quoteCurrency,
  rate,
}: {
  quoteCurrency: Currencies;
} & CurrencyTileRates) => (
  <Link
    href={`/currencies/${baseCurrency.toLowerCase()}/${quoteCurrency.toLowerCase()}`}
  >
    <div className="flex items-center gap-x-4 rounded-lg border-gray-500 bg-secondaryBlack px-4 py-2">
      <FlagCountryCode code={baseCurrency} />
      <p className="text-lg font-semibold">
        {`${cutNumber(rate)}${quoteCurrency.toUpperCase()}`}
      </p>
    </div>
  </Link>
);

export default CurrencyTile;
