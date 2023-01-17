import { Transaction } from '@features/user/history/components/Transactions';
import { Currencies } from '@interfaces/ICurrency';
import { PocketBaseDataResponse } from '@interfaces/IPocketBase';
import useFetch from '@utils/reactQuery/useFetch';

//nie korzystam z tego
export const useUserCurrencyTransactionsQuery = ({
  currency,
  user_id,
}: {
  currency?: Currencies;
  user_id?: string;
}) => {
  const filterCurrency = currency
    ? `&filter=(base_currency='${currency}' || quote_currency='${currency}')`
    : '';
  const filterUser = user_id ? `&user=${user_id}` : '';

  const url = `http://127.0.0.1:8090/api/collections/transaction/records?sort=-created${filterCurrency}${filterUser}`;

  return useFetch<PocketBaseDataResponse<Transaction>>({ url, key: ['a'] });
};
