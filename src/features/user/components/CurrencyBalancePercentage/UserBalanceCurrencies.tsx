import userCurrenciesAmount from '@features/user/tools/userCurrenciesAmount';
import todayWalletValue from '@features/walletHistory/tools/todayWalletValue';
import { User } from '@interfaces/models/IUser';
import { cutNumber } from '@utils/misc';

import CurrencyBalance from '../CurrencyBalance';

const UserBalanceCurrencies = async ({
  user,
  containerClassName = '',
  accountID = true,
  baseValue = true,
  horizontal,
  itemClassName = '',
}: {
  user: User;
  containerClassName?: string;
  accountID?: boolean;
  baseValue?: boolean;
  horizontal?: boolean;
  itemClassName?: string;
}) => {
  const { currencyRates } = await todayWalletValue(user);
  const currencyAmounts = userCurrenciesAmount(user.currencies);

  return (
    <div
      className={`flex ${
        horizontal ? 'flex-row' : 'flex-col'
      } ${containerClassName} `}
    >
      <CurrencyBalance
        userID={user.id}
        // eslint-disable-next-line react/no-array-index-key
        currencyCode={user.quote_currency}
        value={currencyAmounts[user.quote_currency]}
        baseValue={
          baseValue
            ? cutNumber(currencyAmounts[user.quote_currency], 2)
            : undefined
        }
        accountID={
          accountID
            ? user.currencies.filter(
                (c) => c.currency === user.quote_currency,
              )[0].account_id
            : undefined
        }
        className={`bg-secondaryBlack ${
          horizontal ? 'h-20 w-60 px-3' : ''
        } ${itemClassName}`}
        quote_currency={user.quote_currency}
      />
      {currencyRates.map((currency, index) => (
        <CurrencyBalance
          currencyRate={currency.rates[0].value}
          userID={user.id}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          currencyCode={currency.base}
          value={currencyAmounts[currency.base]}
          baseValue={
            baseValue
              ? cutNumber(
                  currencyAmounts[currency.base] * currency.rates[0].value,
                  2,
                )
              : undefined
          }
          accountID={
            accountID
              ? user.currencies.filter((c) => c.currency === currency.base)[0]
                  .account_id
              : undefined
          }
          className={`${index % 2 !== 0 ? 'bg-secondaryBlack' : ''} 
          ${horizontal ? 'h-20 w-56 px-3' : ''} ${itemClassName}`}
          quote_currency={user.quote_currency}
        />
      ))}
    </div>
  );
};

export default UserBalanceCurrencies;
