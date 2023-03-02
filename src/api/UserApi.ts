import { Currencies } from '@interfaces/ICurrency';
import { Transaction } from '@interfaces/ITransaction';
import { UserModel } from '@interfaces/models/IUser';
import api from '@utils/api';

import pb from './PocketBase';

export const getUser = async () => {
  const url = `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/collections/user/records/${process.env.NEXT_PUBLIC_USER_ID}`;
  return await api.get<UserModel>(url);
};

export const getUserCurrencyTransactions = async ({
  currency,
  user_id,
}: {
  currency?: Currencies;
  user_id?: string;
}): Promise<Transaction[]> => {
  const user_filter = user_id
    ? `user_id = "${process.env.NEXT_PUBLIC_USER_ID}"`
    : '';
  const currency_filter = currency
    ? `(base_currency = "${currency}" || quote_currency = "${currency}")`
    : '';

  return await pb.collection('transaction').getFullList(200, {
    sort: '-created',
    filter: [user_filter, currency_filter].filter(Boolean).join('&&'),
  });
};
