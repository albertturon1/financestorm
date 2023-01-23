import Link from 'next/link';

import FlagCountryCode from '@components/FlagCountryCode';
import { Currencies } from '@interfaces/ICurrency';

const CurrencyBalance = ({
  userID,
  currencyCode,
  value,
  accountID,
  className = '',
  current_currency,
  baseValue,
}: {
  userID: string;
  currencyCode: Currencies;
  value: number;
  accountID?: string;
  className?: string;
  current_currency: Currencies;
  baseValue?: number;
}) => (
  <Link
    href={`/user/${userID}/transactions/${currencyCode}`}
    className={`lg flex w-full flex-col px-2 pt-4 pb-3 text-sm
		  ${currencyCode !== current_currency ? 'cursor-pointer' : ''} ${className} `}
  >
    <div className="flex items-center justify-between">
      <FlagCountryCode code={currencyCode} flagClassName="w-6" />
      {accountID && <p className="text-sm">{accountID}</p>}
    </div>
    <div className="flex items-center justify-between py-1.5">
      <p>{'Saldo bankowe'}</p>
      <p className="text-base font-semibold">{`${value} ${currencyCode.toUpperCase()}`}</p>
    </div>
    {baseValue && currencyCode !== current_currency && (
      <p className="self-end text-base font-semibold">{`${baseValue} ${current_currency.toUpperCase()}`}</p>
    )}
  </Link>
);

export default CurrencyBalance;
