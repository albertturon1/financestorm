'use client';

import useCurrentCurrencyRatesData from '@features/main/hooks/useCurrentCurrencyRatesData';
import useGetWalletValue from '@hooks/useGetWalletValue';
import { Currencies } from '@interfaces/ICurrency';
import { User } from 'app/user/[id]/page';

import CurrencyBalance from './CurrencyBalance';

const UserBalance = ({ user }: { user: User }) => {
  const [currencyRatesData] = useCurrentCurrencyRatesData();
  const { walletInBase } = useGetWalletValue(user, currencyRatesData);

  return (
    <div className="flex w-96 flex-col">
      <p className="mb-2 font-semibold">{'Portfel'}</p>
      {Object.keys({
        pln: user.pln,
        chf: user.chf,
        usd: user.usd,
        eur: user.eur,
        gbp: user.gbp,
      }).map((currencyCode, index) => (
        <CurrencyBalance
          userID={user.id}
          key={currencyCode}
          currencyCode={currencyCode as Currencies}
          value={user[currencyCode as Currencies]}
          accountID={user[`${currencyCode as Currencies}_id`]}
          className={index % 2 === 0 ? 'bg-secondaryBlack' : ''}
          current_currency={user.current_currency}
        />
      ))}
      <div className="mt-3 flex w-full flex-col items-end border-t pt-3 pr-2">
        <p className="mb-1 text-sm font-semibold">
          {'Łączna wartość portfela'}
        </p>
        {currencyRatesData && (
          <p className="text-xl font-bold">{`${walletInBase.summary} PLN`}</p>
        )}
      </div>
    </div>
  );
};

export default UserBalance;
