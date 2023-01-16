import { Transaction } from '@features/user/history/components/Transactions';
import { CurrencyCodes } from '@interfaces/ICurrency';
import { PocketBaseDataResponse } from '@interfaces/IPocketBase';
import { genQueryString } from '@utils/misc';
import { User } from 'app/user/[id]/page';

export const getUser = async (id: string): Promise<User> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/user/records/${id}`,
  );
  return (await res.json()) as Promise<User>;
};

export const getUserCurrencyTransactions = async (
  currency?: CurrencyCodes,
  user_id?: string,
): Promise<PocketBaseDataResponse<Transaction>> => {
  const filterCurrency = currency
    ? `(base_currency="${currency}"||quote_currency="${currency}")`
    : '';
  const filterUser = user_id ? `user_id="${user_id}"` : '';
  const filterArray = [filterUser, filterCurrency].filter((item) => item);
  const filter =
    filterArray.length > 1 ? filterArray.join('&&') : filterArray[0];

  const args = genQueryString({
    sort: '-created',
    filter: currency || user_id ? filter : undefined,
  });

  const url = `http://127.0.0.1:8090/api/collections/transaction/records?${args}`;
  const res = await fetch(url);
  return (await res.json()) as Promise<PocketBaseDataResponse<Transaction>>;
};
