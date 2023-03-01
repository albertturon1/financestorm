import { Currencies } from '@interfaces/ICurrency';
import { Transaction } from '@interfaces/ITransaction';

import CurrencyPairSummary from './CurrencyPairSummary';
import currenciesPairSummary from '../tools/currenciesPairSummary';

const UserCurrencyPairSummary = (props: {
  transactions: Transaction[];
  quoteCurrency: Currencies;
}) => {
  const currrencyPairSummary = currenciesPairSummary(props.transactions);

  //console.log(JSON.stringify(currrencyPairSummary));

  return (
    <div className="mb-5 flex w-full flex-col">
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
