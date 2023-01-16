import Link from 'next/link';

import FlagCountryCode from '@components/FlagCountryCode';
import { CurrencyCodes } from '@interfaces/ICurrency';

const CurrencyBalance = ({
  userID,
  currencyCode,
  value,
  accountID,
  className,
  current_currency,
}: {
  userID: string;
  currencyCode: CurrencyCodes;
  value: number;
  accountID: string;
  className?: string;
  current_currency: CurrencyCodes;
}) => (
  <Link
    href={`/user/${userID}/transactions/${currencyCode}`}
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    className={`${className} lg flex w-full flex-col px-2 pt-4 pb-3 text-sm
		  ${currencyCode !== current_currency ? 'cursor-pointer' : ''}`}
  >
    <div className="flex justify-between">
      <FlagCountryCode code={currencyCode} flagClassName="w-6" />
      <p className="text-sm">{accountID}</p>
    </div>
    <div className="flex justify-between pt-2">
      <p>{'Saldo bankowe'}</p>
      <p className="text-base font-semibold">{`${value} ${currencyCode.toUpperCase()}`}</p>
    </div>
  </Link>
);

export default CurrencyBalance;
