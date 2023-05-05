import useWalletStore from '@src/zustand/walletStore';
import NavbarLink from './NavbarLink';

const NavbarItems = (props: { onClick?: () => void }) => {
  const walletQuoteCurrency = useWalletStore.getState().quoteCurrency.name;
  const walletBaseCurrencies = useWalletStore
    .getState()
    .baseCurrencies.map((c) => c.name)
    .join(',') satisfies string;
  const walletTimespan = useWalletStore.getState().timespan;
  
  return (
    <div className="flex max-h-full flex-col sm:flex-row sm:gap-x-5 sm:text-[0.95rem] lg:gap-x-6">
      {/*homepage hidden on mobile */}
      <NavbarLink {...props} title="Homepage" href="/" />
      <NavbarLink {...props} title="Exchange rates" href="/currencies" />
      <NavbarLink
        {...props}
        title="Rates comparisons"
        href="/multi-currencies"
      />
      <NavbarLink
        {...props}
        title="Multicurrency wallet"
        href={`/wallet?quote=${walletQuoteCurrency}&base=${walletBaseCurrencies}&timespan=${walletTimespan}`}
      />
    </div>
  );
};

export default NavbarItems;
