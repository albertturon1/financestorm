'use client';

import { DateTime } from 'luxon';
import { twMerge } from 'tailwind-merge';

import FlagCountryCode from '@components/FlagCountryCode';
import { SERVER_DATE } from '@constants/dateTime';
import { Currency } from '@interfaces/ICurrency';
import { useDailyCurrencyRatesQuery } from '@src/api/client/CurrenctyRateClientApi';
import { separateToDailyCurrencyRates } from '@utils/convertRatesToQuoteCurrency';

import { PopularCurrencyRatesItem } from './PopularCurrencyRatesItem';

const DAYS_BACK = 30;

export const PopularCurrencyRates = () => {
  const quoteCurrency = 'PLN';
  const baseCurrencies = ['USD', 'EUR', 'GBP', 'CHF'] satisfies Currency[];

  const { data, isError, isLoading } = useDailyCurrencyRatesQuery({
    quote_currency: quoteCurrency,
    base_currencies: baseCurrencies,
    start_date: DateTime.now()
      .minus({ days: DAYS_BACK - 1 })
      .toFormat(SERVER_DATE),
    end_date: DateTime.now().toFormat(SERVER_DATE),
  });

  if (isLoading) return <p>Loading</p>;
  if (isError || !data) return <p>Error</p>;
  const separateDailyCurrencyRates = separateToDailyCurrencyRates(data);

  //everything besides button takes 2 cols, button takes 1
  const columnsStyle =
    'sm:grid-cols-9 grid h-14 w-full grid-cols-5 items-center gap-x-2.5 border-b-[1.5px] border-stark pl-2 text-navy xs:h-16 xs:grid-cols-7 xs:pl-3 sm:pl-4';
  const amountStyle = 'pl-2 col-span-2';
  const changeStyle = 'hidden sm:flex col-span-2';
  const chartStyle = 'hidden xs:flex col-span-2 col-span-2';
  const currencyStyle = 'col-span-2';

  return (
    <div className="flex flex-col font-bold">
      {/* Legend */}
      <div
        className={twMerge(
          columnsStyle,
          'h-12 border-0 text-[0.9rem] xs:h-14 xs:text-base',
        )}
      >
        <p className={currencyStyle}>{'Currency'}</p>
        <p className={amountStyle}>{'Amount'}</p>
        <p className={changeStyle}>{`Change (${DAYS_BACK}d)`}</p>
        <p className={chartStyle}>{`Chart (${DAYS_BACK}d)`}</p>
      </div>
      {/* Quote currency */}
      <div
        className={twMerge(columnsStyle, 'overflow-hidden rounded-lg bg-stark')}
      >
        <div className={currencyStyle}>
          <FlagCountryCode code={separateDailyCurrencyRates.quote_currency} />
        </div>
        <p className={amountStyle}>{'1'}</p>
      </div>
      {separateDailyCurrencyRates.rates_array.map((currencyRates) => (
        <PopularCurrencyRatesItem
          key={`${currencyRates.base_currency}-${currencyRates.quote_currency}`}
          currencyRates={currencyRates}
          columnsStyle={columnsStyle}
          changeStyle={changeStyle}
          chartStyle={chartStyle}
          amountStyle={amountStyle}
          currencyStyle={currencyStyle}
        />
      ))}
    </div>
  );
};
