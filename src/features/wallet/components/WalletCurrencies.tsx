import { Currency } from '@interfaces/ICurrency';
import {
  useWalletBaseCurrenciesNames,
  useWalletQuoteCurrencyName,
} from '@src/zustand/walletStore';

const WalletCurrencies = ({ quoteCurrency }: { quoteCurrency: Currency }) => <div />;

export default WalletCurrencies;
