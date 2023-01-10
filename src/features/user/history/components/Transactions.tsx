'use client';

import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from 'react-icons/bs';

import { CurrencyCodes } from '@interfaces/ICurrency';

const typeColumnWidth = 'w-12';

export interface Transaction {
  base_currency: CurrencyCodes;
  quote_currency: CurrencyCodes;
  base_currency_value: number;
  quote_currency_value: number;
  exchange_rate: number;
  user_id: string;
  id: string;
  created: string;
  updated: string;
}

type TransactionType = 'sell' | 'buy';

const Transactions = ({
  baseCurrency,
  transactions,
  arrows,
}: {
  baseCurrency: CurrencyCodes;
  transactions: Transaction[] | undefined;
  arrows?: boolean;
  // eslint-disable-next-line arrow-body-style
}) => {
  if (!transactions) return null;
  return (
    <div className="flex flex-col">
      {/*Header */}
      <div className="mb-3 flex px-1">
        {arrows && <div className={typeColumnWidth} />}
        <HeaderText>{'ID transakcji'}</HeaderText>
        <HeaderText wide>{'Waluta sprzedawana'}</HeaderText>
        <HeaderText>{'Waluta kupowana'}</HeaderText>
        <HeaderText wide>{'Kwota sprzedawana'}</HeaderText>
        <HeaderText wide>{'Kwota kupowana'}</HeaderText>
        <HeaderText>{'Kurs wymiany'}</HeaderText>
        <HeaderText wide>{'Termin transakcji'}</HeaderText>
      </div>
      <div className="flex flex-col">
        {transactions?.map((item, index) => (
          <TransactionRecord
            key={`${item.id}${Math.random()}`}
            transaction={item}
            className={index % 2 === 0 ? 'bg-secondaryBlack' : ''}
            type={item.base_currency === baseCurrency ? 'sell' : 'buy'}
            arrows={arrows}
          />
        ))}
      </div>
    </div>
  );
};

const TransactionRecord = ({
  transaction,
  className,
  type,
  arrows,
}: {
  transaction: Transaction;
  className?: string;
  type?: TransactionType;
  arrows?: boolean;
}) => {
  const baseCurrency = transaction.base_currency.toUpperCase();
  const quoteCurrency = transaction.quote_currency.toUpperCase();

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <div className={`flex w-full items-center py-4 px-1 ${className}`}>
      {arrows && (
        <div className={typeColumnWidth}>
          {type === 'buy' ? (
            <BsFillArrowLeftSquareFill className="h-5 w-5 text-green-500" />
          ) : (
            <BsFillArrowRightSquareFill className="h-5 w-5 text-red-500" />
          )}
        </div>
      )}
      <Text>{transaction.id}</Text>
      <Text wide>{baseCurrency}</Text>
      <Text>{quoteCurrency}</Text>
      <Text wide>{`${transaction.base_currency_value} ${baseCurrency}`}</Text>
      <Text wide>{`${transaction.quote_currency_value} ${quoteCurrency}`}</Text>
      <Text>{transaction.exchange_rate}</Text>
      <Text wide>{transaction.created.split('.')[0]}</Text>
    </div>
  );
};

interface TextProps {
  children: string | number;
  wide?: boolean;
  className?: string;
}

const Text = ({ children, wide, className }: TextProps) => (
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  <p className={`text-sm ${wide ? 'w-48' : 'w-40'} ${className}`}>{children}</p>
);

const HeaderText = (props: TextProps) => (
  <Text
    className="text-base font-semibold tracking-tight text-gray-200"
    {...props}
  >
    {props.children}
  </Text>
);

export default Transactions;
