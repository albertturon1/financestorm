import { ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

import FlagCountryCode from '@components/FlagCountryCode';
import { Currency } from '@interfaces/ICurrency';

import UserWalletBalancesRowWrapper from './UserWalletBalancesRowWrapper';

const UserWalletBalancesItem = ({
  children,
  className,
  onClick,
  currency,
  walletID,
  hideAccountID,
}: {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  currency: Currency;
  walletID: string;
  hideAccountID?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={!onClick}
    className={twMerge(
      'flex min-w-max flex-1 flex-col px-3 py-3 pt-4 text-sm gap-y-1.5',
      className,
    )}
  >
    <UserWalletBalancesRowWrapper>
      <FlagCountryCode code={currency} flagClassName="w-6" />
      {!hideAccountID && <p className="text-sm">{walletID}</p>}
    </UserWalletBalancesRowWrapper>
    {children}
  </button>
);

export default UserWalletBalancesItem;
