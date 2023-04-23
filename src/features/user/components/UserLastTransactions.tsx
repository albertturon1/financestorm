import { Currency } from '@interfaces/ICurrency';
import { Transaction } from '@interfaces/ITransaction';

import Transactions from '../history/components/Transactions';

const UserLastTransactions = (props: {
  transactions: Transaction[];
  quoteCurrency: Currency;
}) => (
  <div className="flex w-full flex-col">
    <p className="mb-4 font-semibold underline">
      {'Ostatnie transfery walutowe'}
    </p>
    <Transactions {...props} />
  </div>
);

export default UserLastTransactions;
