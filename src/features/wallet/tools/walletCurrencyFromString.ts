import { CURRENCIES } from '@constants/currencies';
import { Currency } from '@interfaces/ICurrency';
import { WalletCurrency } from '@src/zustand/walletStore';

export function getWalletCurrencyFromString(param: string | undefined) {
  if (!param) return;
  const currencyCodeMatch = param.match(/\d+|[^0-9]+/g); //[number, string]

  const matchingCurrency =
    currencyCodeMatch &&
    currencyCodeMatch.length === 2 &&
    CURRENCIES.find((currency) => currency === currencyCodeMatch[1]);

  if (!matchingCurrency) return;
  return {
    amount: Number(currencyCodeMatch[0]),
    name: currencyCodeMatch[1] as Currency,
  } satisfies WalletCurrency;
}
