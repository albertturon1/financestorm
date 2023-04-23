import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from 'react-icons/bs';

import { Currency } from '@interfaces/ICurrency';
import { Transaction, TransactionType } from '@interfaces/ITransaction';

import TransactionsFlagCountry from './TransactionsFlagCountry';

const typeColumnWidth = 'w-12';

const Transactions = ({
  quoteCurrency,
  transactions,
  arrows,
}: {
  quoteCurrency: Currency;
  transactions: Transaction[] | undefined;
  arrows?: boolean;
}) => (
  <div className="flex flex-col">
    {/*Header */}
    <div className="mb-3 flex px-1">
      {arrows && <div className={typeColumnWidth} />}
      <HeaderText>{'ID transakcji'}</HeaderText>
      <HeaderText wide>{'Waluta sprzedawana'}</HeaderText>
      <HeaderText wide>{'Waluta kupowana'}</HeaderText>
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
          type={item.base_currency === quoteCurrency ? 'sell' : 'buy'}
          arrows={arrows}
        />
      ))}
    </div>
  </div>
);

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
}) => (
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
    <TransactionsFlagCountry
      currency={transaction.quote_currency}
      className="w-48"
    />
    <TransactionsFlagCountry
      currency={transaction.base_currency}
      className="w-48"
    />
    <Text wide>{`${transaction.base_currency_value
      } ${transaction.base_currency.toUpperCase()}`}</Text>
    <Text wide>{`${transaction.quote_currency_value
      } ${transaction.quote_currency.toUpperCase()}`}</Text>
    <Text>{transaction.exchange_rate}</Text>
    <Text wide>{transaction.created.split('.')[0]}</Text>
  </div>
);

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
