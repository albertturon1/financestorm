'use client';

import { TransactionPairSummary } from '@interfaces/ITransaction';

import TransactionsFlagCountry from '../history/components/TransactionsFlagCountry';

const CurrencyPairSummary = ({
  summary,
}: {
  summary: TransactionPairSummary[];
}) => (
  <div className="flex flex-col">
    {/*Header */}
    <div className="mb-3 flex gap-x-2 px-1">
      <HeaderText wide>{'Waluta sprzedawana'}</HeaderText>
      <HeaderText wide>{'Waluta kupowana'}</HeaderText>
      <HeaderText>{'Liczba transakcji'}</HeaderText>

      <HeaderText wide>{'Śr. kwota sprzedawana'}</HeaderText>
      <HeaderText wide>{'Min kwota sprzedawana'}</HeaderText>
      <HeaderText wide>{'Max kwota sprzedawana'}</HeaderText>

      <HeaderText wide>{'Śr. kwota kupowana'}</HeaderText>
      <HeaderText wide>{'Min kwota kupowana'}</HeaderText>
      <HeaderText>{'Max kwota kupowana'}</HeaderText>

      <HeaderText wide>{'Średni kurs wymiany'}</HeaderText>
      <HeaderText>{'Min kurs wymiany'}</HeaderText>
      <HeaderText>{'Max kurs wymiany'}</HeaderText>
    </div>
    <div className="flex flex-col">
      {summary?.map((item, index) => (
        <TransactionRecord
          key={`${item.base_currency}_${item.quote_currency}`}
          summary={item}
          className={index % 2 === 0 ? 'bg-secondaryBlack' : ''}
        />
      ))}
    </div>
  </div>
);

const TransactionRecord = ({
  summary,
  className,
}: {
  summary: TransactionPairSummary;
  className?: string;
}) => {
  const baseCurrency = summary.base_currency.toUpperCase();
  const quoteCurrency = summary.quote_currency.toUpperCase();

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <div className={`flex w-full items-center gap-x-2 py-3 px-1 ${className}`}>
      <TransactionsFlagCountry currency={quoteCurrency} className="w-52" />
      <TransactionsFlagCountry currency={baseCurrency} className="w-52" />
      <Text>{summary.appearance}</Text>

      <Text wide>{`${summary.avg_quote_currency_value} ${quoteCurrency}`}</Text>
      <Text wide>{`${summary.min_quote_currency_value} ${quoteCurrency}`}</Text>
      <Text wide>{`${summary.max_quote_currency_value} ${quoteCurrency}`}</Text>

      <Text wide>{`${summary.avg_base_currency_value} ${baseCurrency}`}</Text>
      <Text wide>{`${summary.min_base_currency_value} ${quoteCurrency}`}</Text>
      <Text>{`${summary.max_base_currency_value} ${quoteCurrency}`}</Text>

      <Text wide>{`${summary.avg_exchange_rate} ${quoteCurrency}`}</Text>
      <Text>{`${summary.min_exchange_rate} ${quoteCurrency}`}</Text>
      <Text>{`${summary.max_exchange_rate} ${quoteCurrency}`}</Text>
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
  <p className={`text-sm ${wide ? 'w-52' : 'w-40'} ${className}`}>{children}</p>
);

const HeaderText = (props: TextProps) => (
  <Text
    className="text-base font-semibold tracking-tight text-gray-200"
    {...props}
  >
    {props.children}
  </Text>
);

export default CurrencyPairSummary;
