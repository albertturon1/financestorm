import { ReactNode } from 'react';

const UserWalletBalancesRowWrapper = ({
  children,
}: {
  children: ReactNode;
}) => (
  <div className="flex w-full items-center justify-between gap-x-5">
    {children}
  </div>
);

export default UserWalletBalancesRowWrapper;
