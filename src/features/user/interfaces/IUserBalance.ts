import {
  QuoteCurrencyWalletValue,
  BaseCurrencyWalletValue,
} from '@features/walletHistory/tools/todayWalletValue';

export interface UserBalanceChart {
  data: readonly [QuoteCurrencyWalletValue, ...BaseCurrencyWalletValue[]];
}
