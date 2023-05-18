import { useEffect } from 'react';

import { Timespan } from '@interfaces/ICharts';
import { WalletCurrency, useWalletActions } from '@src/zustand/walletStore';

//update wallet store after URL query params change
const useUpdateWalletStore = (props: {
  timespan: Timespan;
  walletQuoteCurrency: WalletCurrency;
  walletBaseCurrencies: WalletCurrency[];
}) => {
  const {
    patchWalletBaseCurrencies,
    patchWalletQuoteCurrency,
    patchWalletTimespan,
  } = useWalletActions();

  useEffect(() => {
    patchWalletTimespan(props.timespan);
  }, [props, props.timespan, patchWalletTimespan]);

  useEffect(() => {
    patchWalletBaseCurrencies(props.walletBaseCurrencies);
  }, [patchWalletBaseCurrencies, props.walletBaseCurrencies]);

  useEffect(() => {
    patchWalletQuoteCurrency(props.walletQuoteCurrency);
  }, [patchWalletQuoteCurrency, props.walletQuoteCurrency]);
};

export default useUpdateWalletStore;
