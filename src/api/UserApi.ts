import { Transaction } from '@features/user/history/components/Transactions';
import { Currencies } from '@interfaces/ICurrency';
import { PocketBaseDataResponse } from '@interfaces/IPocketBase';
import { User } from '@interfaces/models/IUser';
import api from '@utils/api';
import { genQueryString } from '@utils/misc';

export const getUser = async (id: string) => {
  const url = `http://127.0.0.1:8090/api/collections/user/records/${id}`;
  return await api.get<User>(url);
};

export const getUserCurrencyTransactions = async (
  currency?: Currencies,
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
  return await api.get<PocketBaseDataResponse<Transaction>>(url);
};
