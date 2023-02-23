import { twMerge } from 'tailwind-merge';

import FlagCountryCode from '@components/FlagCountryCode';
import { Currencies } from '@interfaces/ICurrency';

const CurrencyBalance = ({
  onClick,
  walletID,
  currencyCode,
  balance,
  className = '',
  quote_currency,
  baseValue,
  currencyRate,
}: {
  onClick?: () => void;
  walletID?: string;
  currencyRate?: number;
  className?: string;
  currencyCode: Currencies;
  balance: number;
  quote_currency: Currencies;
  baseValue?: number;
}) => (
  <button
    onClick={onClick}
    disabled={!onClick}
    className={
      (twMerge('lg flex w-full flex-col bg-red-300 px-2 pt-4 pb-3 text-sm'),
      className)
    }
  >
    <div className="flex items-center justify-between pb-1.5">
      <FlagCountryCode code={currencyCode} flagClassName="w-6" />
      {walletID && <p className="text-sm">{walletID}</p>}
    </div>
    {baseValue && currencyCode !== quote_currency && (
      <div className="flex items-center justify-between pb-1.5">
        <p>{'Kurs'}</p>
        <p className="self-end font-medium">{`${currencyRate} ${quote_currency.toUpperCase()}`}</p>
      </div>
    )}
    <div className="flex items-center justify-between pb-1.5">
      <p>{'Saldo bankowe'}</p>
      <p className="font-medium">{`${balance} ${currencyCode.toUpperCase()}`}</p>
    </div>
    {baseValue && currencyCode !== quote_currency && (
      <div className="flex items-center justify-between">
        <p className="font-medium">{'Suma'}</p>
        <p className="font-semibold">{`${baseValue} ${quote_currency.toUpperCase()}`}</p>
      </div>
    )}
  </button>
);

export default CurrencyBalance;
