'use client';

import Link from 'next/link';

import { CurrencyTileRates } from '@app/currencies/[currency]/page';
import FlagCountryCode from '@components/FlagCountryCode';
import { Currencies } from '@interfaces/ICurrency';
import { cutNumber } from '@utils/misc';

type CurrencyTileProps = {
  quoteCurrency: Currencies;
} & CurrencyTileRates;

const CurrencyTile = ({
  baseCurrency,
  quoteCurrency,
  rate,
}: CurrencyTileProps) => (
  <Link
    href={`/currencies/${baseCurrency.toLowerCase()}/${quoteCurrency.toLowerCase()}`}
  >
    <div className="flex items-center gap-x-4 rounded-lg border-gray-500 bg-secondaryBlack px-4 py-2">
      <FlagCountryCode code={baseCurrency} />
      <p className="text-lg font-semibold">
        {`${cutNumber(rate)}${quoteCurrency}`}
      </p>
    </div>
  </Link>
);

export default CurrencyTile;
