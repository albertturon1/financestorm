'use client';

import { Plus } from 'lucide-react';

import { Button } from '@components/ui/Button';
import { WalletCurrency } from '@src/zustand/walletStore';

import { WALLET_SELECTORS_INPUT_MAX_WIDTH } from './WalletCurrenciesSelectors';
import WalletCurrencyInputSelect from './WalletCurrencyInputSelect';
import { useWalletAddBaseCurrencyMethods } from '../hooks/useWalletAddBaseCurrencyMethods';

export const WalletAddBaseCurrency = (props: {
  walletBaseCurrencies: WalletCurrency[];
  walletQuoteCurrency: WalletCurrency;
}) => {
  const {
    newWalletCurrency,
    addCurrency,
    onInputChange,
    onCurrencyChange,
    availableCurrencies,
  } = useWalletAddBaseCurrencyMethods({
    ...props,
    walletQuoteCurrencyName: props.walletQuoteCurrency.name,
  });

  const buttonEnabled =
    !isNaN(newWalletCurrency.amount) && newWalletCurrency.name;

  return (
    <div className="flex gap-x-1">
      <div style={{ width: WALLET_SELECTORS_INPUT_MAX_WIDTH }}>
        <WalletCurrencyInputSelect
          value={`${newWalletCurrency.amount}`} //template literal to prevent error "The specified value "NaN" cannot be parsed, or is out of range."
          currencies={availableCurrencies}
          currentCurrency={newWalletCurrency.name}
          onInputChange={onInputChange}
          onCurrencyChange={onCurrencyChange}
        />
      </div>
      <Button
        disabled={!buttonEnabled}
        variant="outline"
        className="aspect-square rounded-xl px-0"
        onClick={addCurrency}
      >
        <Plus strokeWidth={1} size={25} />
      </Button>
    </div>
  );
};
