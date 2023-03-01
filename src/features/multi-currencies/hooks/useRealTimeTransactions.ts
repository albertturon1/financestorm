'use client';

import { useEffect, useState } from 'react';

import { Record } from 'pocketbase';

import { PocketBaseDataResponse } from '@interfaces/IPocketBase';
import { Transaction } from '@interfaces/ITransaction';
import pb from 'src/api/PocketBase';

export interface RealTimeTransaction extends Transaction {
  collectionId: string;
  collectionName: 'transaction';
  expand: Record;
}

const useRealTimeTransactions = (
  transaction: PocketBaseDataResponse<Transaction> | undefined,
) => {
  const [data, setData] = useState<(Transaction | Record)[]>([]);

  useEffect(() => {
    if (transaction) setData(transaction.items);
  }, [transaction]);

  if (!transaction) return [];

  void pb.collection('transaction').subscribe('*', (e) => {
    setData((prev) => [e.record, ...prev]);
  });

  return data;
};
export default useRealTimeTransactions;
