'use client';

import useWalletStore, {
  useWalletBaseCurrencies,
  useWalletQuoteCurrency,
} from '@src/zustand/walletStore';

import NavbarLink from './NavbarLink';

const NavbarWalletLink = (props: { onClick?: () => void }) => {
  const walletQuoteCurrency = useWalletQuoteCurrency();
  const walletBaseCurrenciesWhole = useWalletBaseCurrencies();

  const walletTimespan = useWalletStore.getState().timespan;

  const quoteCurrency = `${walletQuoteCurrency.amount}${walletQuoteCurrency.name}`;

  const baseCurrencies = walletBaseCurrenciesWhole
    .map((c) => `${c.amount}${c.name}`)
    .join(',');

  return (
    <NavbarLink
      {...props}
      title="Virtual wallet"
      href={`/wallet?quote=${quoteCurrency}&base=${baseCurrencies}&timespan=${walletTimespan}`}
    />
  );
};

export default NavbarWalletLink;
