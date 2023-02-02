import Link from 'next/link';

import FlagCountryCode from '@components/FlagCountryCode';
import { Currencies } from '@interfaces/ICurrency';

const CurrencyBalance = ({
  userID,
  currencyCode,
  value,
  accountID,
  className = '',
  quote_currency,
  baseValue,
  currencyRate,
}: {
  userID: string;
  currencyCode: Currencies;
  value: number;
  accountID?: string;
  className?: string;
  quote_currency: Currencies;
  baseValue?: number;
  currencyRate?: number;
}) => (
  <Link
    href={`/user/${userID}/transactions/${currencyCode}`}
    className={`lg flex w-full flex-col px-2 pt-4 pb-3 text-sm
		  ${currencyCode !== quote_currency ? 'cursor-pointer' : ''} ${className} `}
  >
    <div className="flex items-center justify-between pb-1.5">
      <FlagCountryCode code={currencyCode} flagClassName="w-6" />
      {accountID && <p className="text-sm">{accountID}</p>}
    </div>
    {baseValue && currencyCode !== quote_currency && (
      <div className="flex items-center justify-between pb-1.5">
        <p>{'Kurs'}</p>
        <p className="self-end font-medium">{`${currencyRate} ${quote_currency.toUpperCase()}`}</p>
      </div>
    )}
    <div className="flex items-center justify-between pb-1.5">
      <p>{'Saldo bankowe'}</p>
      <p className="font-medium">{`${value} ${currencyCode.toUpperCase()}`}</p>
    </div>
    {baseValue && currencyCode !== quote_currency && (
      <div className="flex items-center justify-between">
        <p className="font-medium">{'Suma'}</p>
        <p className="font-semibold">{`${baseValue} ${quote_currency.toUpperCase()}`}</p>
      </div>
    )}
  </Link>
);

export default CurrencyBalance;
