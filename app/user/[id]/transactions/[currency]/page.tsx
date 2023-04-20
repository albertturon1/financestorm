import FlagCountryCode from '@components/FlagCountryCode';
import PageTitle from '@components/PageTitle';
import { PADDING_TAILWIND } from '@constants/globals';
import Transactions from '@features/user/history/components/Transactions';
import { Currency } from '@interfaces/ICurrency';
import { getUserCurrencyTransactions } from 'src/api/UserApi';

import { UserParams } from '../../page';

type CurrencyHistoryProps = {
  currency: Currency;
} & UserParams;

const CurrencyHistory = async ({
  params,
}: {
  params: CurrencyHistoryProps;
}) => {
  const history = await getUserCurrencyTransactions();

  return (
    <div className={`${PADDING_TAILWIND} h-full w-full bg-primaryBlack`}>
      <div className="flex gap-x-2">
        <PageTitle>{'Historia transakcji'}</PageTitle>
        <FlagCountryCode code={params.currency} reverse className="text-2xl" />
      </div>
      <div className="mt-5 flex flex-col">
        {history.length ? (
          <Transactions
            transactions={history}
            quoteCurrency={params.currency}
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
