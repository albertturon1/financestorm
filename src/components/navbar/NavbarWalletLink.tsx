'use client';

import useWalletStore, {
  useWalletBaseCurrencies,
  useWalletQuoteCurrency,
} from '@src/zustand/walletStore';

import NavbarLink from './NavbarLink';

const NavbarWalletLink = (props: { onClick?: () => void }) => {
  const walletQuoteCurrency = useWalletQuoteCurrency();
  const quoteCurrency = `${walletQuoteCurrency.amount}${walletQuoteCurrency.name}`;
  const walletBaseCurrenciesWhole = useWalletBaseCurrencies();
  const baseCurrencies = walletBaseCurrenciesWhole
    .map((c) => `${c.amount}${c.name}`)
    .join(',');
  const walletTimespan = useWalletStore.getState().timespan;

  return (
    <NavbarLink
      {...props}
      title="Virtual wallet"
      href={`/wallet?quote=${quoteCurrency}&base=${baseCurrencies}&timespan=${walletTimespan}`}
    />
  );
};

export default NavbarWalletLink;
