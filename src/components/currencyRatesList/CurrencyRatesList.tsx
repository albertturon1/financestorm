'use client';

import { DateTime } from 'luxon';
import { twMerge } from 'tailwind-merge';

import FlagCountryCode from '@components/FlagCountryCode';
import PagePadding from '@components/PagePadding';
import SectionTitle from '@components/SectionTitle';
import { SERVER_DATE } from '@constants/dateTime';
import { Currency } from '@interfaces/ICurrency';
import { useDailyCurrencyRatesQuery } from '@src/api/client/CurrenctyRateClientApi';
import { separateToDailyCurrencyRates } from '@utils/convertRatesToQuoteCurrency';

import CurrencyRatesListButton from './CurrencyRatesListButton';
import CurrencyRatesListItem from './CurrencyRatesListItem';
import CurrencyRatesListSkeletonLoader from './CurrencyRatesListSkeletonLoader';

const DAYS_BACK = 30;
const quoteCurrency = 'PLN';
const baseCurrencies = ['USD', 'EUR', 'GBP', 'CHF'] satisfies Currency[];

export const CurrencyRatesList = ({
  showGoToAllButton = false,
}: {
  showGoToAllButton?: boolean;
}) => {
  const { data, isError, isLoading } = useDailyCurrencyRatesQuery({
    quote_currency: quoteCurrency,
    base_currencies: baseCurrencies,
    start_date: DateTime.now()
      .minus({ days: DAYS_BACK - 1 })
      .toFormat(SERVER_DATE),
    end_date: DateTime.now().toFormat(SERVER_DATE),
  });

  if (isLoading) return <CurrencyRatesListSkeletonLoader />;
  if (isError || !data) return <p>Error</p>;
  const separateDailyCurrencyRates = separateToDailyCurrencyRates(data);

  //everything besides button takes 2 cols, button takes 1
  const rowStyle =
    'sm:grid-cols-9 grid h-14 w-full grid-cols-5 items-center gap-x-2.5 border-b-[1.5px] border-pale pl-1 text-navy xs:h-16 xs:grid-cols-7 xs:pl-1.5 sm:pl-4';
  const amountStyle = 'pl-2 col-span-2';
  const changeStyle = 'hidden sm:flex col-span-2';
  const chartStyle = 'hidden xs:flex col-span-2 col-span-2';
  const currencyStyle = 'col-span-2';

  return (
    <div className="flex flex-col gap-y-2">
      <PagePadding>
        <SectionTitle>{'Popular currency pairs'}</SectionTitle>
      </PagePadding>
      {/* Legend */}
      <div className="flex flex-1 flex-col px-1 xs:px-1.5 sm:px-4 lg:px-8">
        {/* Legend */}
        <div className={twMerge(rowStyle, 'h-12 border-0 xs:h-14')}>
          <p className={currencyStyle}>{'Currency'}</p>
          <p className={amountStyle}>{'Amount'}</p>
          <p className={changeStyle}>{`Change (${DAYS_BACK}d)`}</p>
          <p className={chartStyle}>{`Chart (${DAYS_BACK}d)`}</p>
          {showGoToAllButton && (
            <CurrencyRatesListButton
              href={{
                pathname: '/currencies',
              }}
            >
              <p>{'All'}</p>
            </CurrencyRatesListButton>
          )}
        </div>
        {/* Quote currency */}
        <div
          className={twMerge(rowStyle, 'overflow-hidden rounded-lg bg-pale')}
        >
          <div className={currencyStyle}>
            <FlagCountryCode code={separateDailyCurrencyRates.quote_currency} />
          </div>
          <p className={amountStyle}>{'1'}</p>
        </div>
        {separateDailyCurrencyRates.rates_array.map((currencyRates) => (
          <CurrencyRatesListItem
            key={`${currencyRates.base_currency}-${currencyRates.quote_currency}`}
            currencyRates={currencyRates}
            rowStyle={rowStyle}
            changeStyle={changeStyle}
            chartStyle={chartStyle}
            amountStyle={amountStyle}
            currencyStyle={currencyStyle}
          />
        ))}
      </div>
    </div>
  );
};
