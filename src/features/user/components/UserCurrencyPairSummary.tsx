import { Record } from 'pocketbase';

import { useCurrencyPairSummary } from '../hooks/useCurrencyPairSummary';
import CurrencyPairSummary from './CurrencyPairSummary';

const UserCurrencyPairSummary = ({
  transactions,
}: {
  transactions: Record[];
}) => {
  const currrencyPairSummary = useCurrencyPairSummary(transactions);

  if (!currrencyPairSummary.length) return null;
  return (
    <div className="flex w-full flex-col">
      <p className="mb-4 font-semibold underline">
        {'Podsumowanie transferów walutowych'}
      </p>
      <CurrencyPairSummary
        summary={currrencyPairSummary.sort((a, b) =>
          a.appearance < b.appearance ? 1 : -1,
        )}
      />
    </div>
  );
};

export default UserCurrencyPairSummary;
