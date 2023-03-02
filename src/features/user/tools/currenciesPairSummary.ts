import {
  Transaction,
  TransactionPairStatistics,
  TransactionPairSummary,
  TransactionStatistics,
} from '@interfaces/ITransaction';
import { cutNumber } from '@utils/misc';

type Z = Omit<TransactionPairStatistics, 'appearance'>;

const stats = ['max', 'min', 'avg'] as const;

// eslint-disable-next-line sonarjs/cognitive-complexity
const currenciesPairSummary = (transactions: Transaction[]) => {
  if (!transactions.length) return [];
  const keys = Object.keys(transactions[0]).filter(
    (k) => typeof transactions[0][k] === 'number',
  ) as (keyof TransactionStatistics)[];

  return transactions.reduce((acc, t) => {
    const accIndex = acc.findIndex(
      (x) =>
        x.base_currency === t.base_currency &&
        x.quote_currency === t.quote_currency,
    );

    if (accIndex === -1) {
      const statistics = keys.reduce((keysAcc, k) => {
        stats.forEach((r) => {
          const newKey = `${r}_${k}`;
          keysAcc[newKey as keyof Z] = t[k];
        });
        return keysAcc;
      }, {} as Z);

      acc.push({
        base_currency: t.base_currency,
        quote_currency: t.quote_currency,
        appearance: 1,
        ...statistics,
      });
    } else {
      const current = acc[accIndex];

      const statistics = keys.reduce((keysAcc, k) => {
        stats.forEach((r) => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          const newKey = `${r}_${k}` as keyof Z;
          const [prefix] = newKey.split('_');
          if (prefix === 'min') {
            const value = Math.min(t[k], current[newKey]);
            keysAcc[newKey] = cutNumber(value, 4);
          }
          if (prefix === 'max') {
            const value = Math.max(t[k], current[newKey]);
            keysAcc[newKey] = cutNumber(value, 4);
          }
          if (prefix === 'avg') {
            const value = (current[newKey] + t[k]) / 2;
            keysAcc[newKey] = cutNumber(value, 4);
          }
        });
        return keysAcc;
      }, {} as Z);

      acc[accIndex] = {
        ...current,
        ...statistics,
        appearance: current.appearance + 1,
      };
    }

    return acc;
  }, [] as TransactionPairSummary[]);
};

export default currenciesPairSummary;
