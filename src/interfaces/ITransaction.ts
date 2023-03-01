import { Record } from 'pocketbase';

import { Currencies } from './ICurrency';

export interface TransactionStatistics {
  base_currency_value: number;
  quote_currency_value: number;
  exchange_rate: number;
}

interface TransactionCore extends Record {
  id: string;
  base_currency: Currencies;
  quote_currency: Currencies;
  user_id: string;
  created: string;
  updated: string;
}

export type Transaction = TransactionStatistics & TransactionCore;

export interface TransactionPairStatistics {
  min_exchange_rate: number;
  min_base_currency_value: number;
  min_quote_currency_value: number;
  max_exchange_rate: number;
  max_base_currency_value: number;
  max_quote_currency_value: number;
  avg_exchange_rate: number;
  avg_base_currency_value: number;
  avg_quote_currency_value: number;
  appearance: number;
}

export interface TransactionPairSummary extends TransactionPairStatistics {
  base_currency: string;
  quote_currency: string;
}

export type TransactionType = 'sell' | 'buy';
