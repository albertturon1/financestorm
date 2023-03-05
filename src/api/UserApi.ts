import { Transaction } from '@interfaces/ITransaction';
import { UserModel } from '@interfaces/models/IUser';
import api from '@utils/api';

import pb from './PocketBase';

export const getUser = async () => {
  const url = `${process.env.NEXT_PUBLIC_DATABASE_URL ?? ''}/api/collections/user/records/${process.env.NEXT_PUBLIC_USER_ID ?? ''}`;
  return await api.get<UserModel>(url);
};

export const getUserCurrencyTransactions = async (): Promise<Transaction[]> => await pb.collection('transaction').getFullList(200, {
  sort: '-created',
  filter: `user_id = '${process.env.NEXT_PUBLIC_USER_ID ?? ''}'`,
})
