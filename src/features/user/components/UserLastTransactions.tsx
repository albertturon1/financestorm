import { Currencies } from '@interfaces/ICurrency';
import { Transaction } from '@interfaces/ITransaction';

import Transactions from '../history/components/Transactions';

const UserCurrencyPairSummary = (props: {
  transactions: Transaction[];
  quoteCurrency: Currencies;
}) => (
  <div className="flex w-full flex-col">
    <p className="mb-4 font-semibold underline">
      {'Ostatnie transfery walutowe'}
    </p>
    <Transactions {...props} />
  </div>
);

export default UserCurrencyPairSummary;
