import FlagCountryCode from '@components/FlagCountryCode';
import PageTitle from '@components/PageTitle';
import { PADDING_TAILWIND } from '@constants/Globals';
import Transactions from '@features/user/history/components/Transactions';
import { CurrencyCodes } from '@interfaces/ICurrency';
import { getUserCurrencyTransactions } from 'src/api/UserApi';

import { UserParams } from '../../page';

type CurrencyHistoryProps = {
  currency: CurrencyCodes;
} & UserParams;

const CurrencyHistory = async ({
  params,
}: {
  params: CurrencyHistoryProps;
}) => {
  const { currency, id } = params;
  const history = await getUserCurrencyTransactions(currency, id);

  return (
    <div className={`${PADDING_TAILWIND} h-full w-full`}>
      <div className="flex gap-x-2">
        <PageTitle>{'Historia transakcji'}</PageTitle>
        <FlagCountryCode code={currency} reverse className='text-2xl'/>
      </div>
      <div className="mt-5 flex flex-col">
        {history.items.length ? (
          <Transactions
            transactions={history.items}
            baseCurrency={currency}
            arrows
          />
        ) : (
          <p>{'Nie masz żadnych transakcji w wybranej walucie'}</p>
        )}
      </div>
    </div>
  );
};

export default CurrencyHistory;
