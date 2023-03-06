import { twMerge } from 'tailwind-merge';

import todayWalletValue, {
  isBaseCurrencyWalletValue,
} from '@features/walletHistory/tools/todayWalletValue';
import { Currencies } from '@interfaces/ICurrency';
import { getUser } from '@src/api/UserApi';

import UserWalletBalancesItem from './UserWalletBalancesItem';
import UserWalletBalancesRowWrapper from './UserWalletBalancesRowWrapper';

const UserWalletBalances = async ({
  onlyBalance,
  containerClassName = '',
  itemClassName = '',
}: {
  containerClassName?: string;
  itemClassName?: string;
  onlyBalance?: boolean;
}) => {
  const user = await getUser();
  if (!user) return null;
  const walletValue = await todayWalletValue(user);
  
  if (!walletValue) return null;
  return (
    <div
      className={twMerge(
        'max-w-60 flex flex-1 flex-col border border-b-2 border-gray-500',
        containerClassName,
      )}
    >
      {walletValue.currencies.map((c, index) => (
        <UserWalletBalancesItem
          key={c.accountID}
          currency={c.currency}
          walletID={c.accountID}
          hideAccountID={onlyBalance}
          className={`${
            index % 2 === 0 ? 'bg-secondaryBlack' : ''
          } ${itemClassName}`}
        >
          {!onlyBalance && isBaseCurrencyWalletValue(c) && (
            <UserWalletBalancesRowWrapper>
              <p>{'Kurs'}</p>
              <p className="self-end font-medium">
                {`${c.rate} ${user.quote_currency.toUpperCase()}`}
              </p>
            </UserWalletBalancesRowWrapper>
          )}
          <Balance balance={c.amount} quoteCurrency={c.currency} />
          {!onlyBalance && isBaseCurrencyWalletValue(c) && (
            <UserWalletBalancesRowWrapper>
              <p className="font-medium">{'Suma'}</p>
              <p className="font-semibold">{`${c.value} ${user.quote_currency}`}</p>
            </UserWalletBalancesRowWrapper>
          )}
        </UserWalletBalancesItem>
      ))}
    </div>
  );
};

const Balance = ({
  balance,
  quoteCurrency,
}: {
  balance: number;
  quoteCurrency: Currencies;
}) => (
  <UserWalletBalancesRowWrapper>
    <p>{'Saldo bankowe'}</p>
    <p className="font-medium">{`${balance} ${quoteCurrency.toUpperCase()}`}</p>
  </UserWalletBalancesRowWrapper>
);

export default UserWalletBalances;
