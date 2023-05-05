import FlagCountryCode from '@components/misc/FlagCountryCode';
import { WalletCurrency } from '@src/zustand/walletStore';
import { cn } from '@utils/misc';
import React from 'react';

const WalletCurrenciesSelectorsItems = ({
  walletCurrency,
}: {
  walletCurrency: WalletCurrency;
}) => {
  return (
    <div
      className={cn(
        'focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 border-border',
      )}
    >
      <FlagCountryCode code={walletCurrency.name} flagClassName="h-4" />
      <p>{walletCurrency.amount}</p>
    </div>
  );
};

export default WalletCurrenciesSelectorsItems;
