/* eslint-disable sonarjs/no-nested-template-literals */
import PocketBase from 'pocketbase';

import { Currencies } from '@interfaces/ICurrency';
import { Transaction } from '@interfaces/ITransaction';
import { User } from '@interfaces/models/IUser';
import api from '@utils/api';

const pb = new PocketBase('http://127.0.0.1:8090');

export const getUser = async (id: string) => {
  const url = `http://127.0.0.1:8090/api/collections/user/records/${id}`;
  return await api.get<User>(url);
};

export const getUserCurrencyTransactions = async ({
  currency,
  user_id,
}: {
  currency?: Currencies;
  user_id?: string;
}): Promise<Transaction[]> => {
  const user_filter = user_id ? `user_id = "lxiry2v1ochapzp"` : '';
  const currency_filter = currency
    ? `(base_currency = "${currency}" || quote_currency = "${currency}")`
    : '';

  return await pb.collection('transaction').getFullList(200, {
    sort: '-created',
    filter: [user_filter, currency_filter].filter(Boolean).join('&&'),
  });
};
