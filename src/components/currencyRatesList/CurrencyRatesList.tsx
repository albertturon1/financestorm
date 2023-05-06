'use client';

import { twMerge } from 'tailwind-merge';

import FlagCountryCode from '@components/misc/FlagCountryCode';
import DataLoader, { DataLoaderQueryProps } from '@components/ui/DataLoader';
import { ExchangeRateTimeseriesResponse } from '@interfaces/models/IExchangerate';
import { separateToDailyCurrencyRates } from '@utils/currencyRateApiHelpers';

import CurrencyRatesListItem from './CurrencyRatesListItem';
import CurrencyRatesListLegend from './CurrencyRatesListLegend';

export const CurrencyRatesList = ({
  showGoToAllButton = false,
  dataTimespan,
  ...props
}: {
  showGoToAllButton?: boolean;
  dataTimespan: number;
} & DataLoaderQueryProps<ExchangeRateTimeseriesResponse | undefined>) => {
  //everything besides button takes 2 cols, button takes 1
  const styles = {
    rowStyle:
      'sm:grid-cols-9 grid h-14 w-full grid-cols-5 items-center gap-x-2.5 border-b-[1.5px] border-pale px-1 text-navy xs:h-16 xs:grid-cols-7 xs:px-1.5 sm:px-4',
    amountStyle: 'pl-2 col-span-2',
    changeStyle: 'hidden sm:flex col-span-2',
    chartStyle: 'hidden xs:flex col-span-2 col-span-2',
    currencyStyle: 'col-span-2 text-sm sm:text-base',
  };

  return (
    <DataLoader {...props}>
      {(data) => {
        const separateDailyCurrencyRates = separateToDailyCurrencyRates(data);
        return (
          <div className="flex flex-1 flex-col px-1 xs:px-1.5 sm:px-4 lg:px-8">
            <CurrencyRatesListLegend
              {...styles}
              dataTimespan={dataTimespan}
              showGoToAllButton={showGoToAllButton}
            />

            {/* Quote currency */}
            <div
              className={twMerge(
                styles.rowStyle,
                'overflow-hidden rounded-lg bg-pale',
              )}
            >
              <div className={styles.currencyStyle}>
                <FlagCountryCode
                  code={separateDailyCurrencyRates.quote_currency}
                />
              </div>
              <p className={styles.amountStyle}>{'1'}</p>
            </div>
            {separateDailyCurrencyRates.rates_array.map((currencyRates) => (
              <CurrencyRatesListItem
                key={`${currencyRates.base_currency}-${currencyRates.quote_currency}`}
                currencyRates={currencyRates}
                {...styles}
              />
            ))}
          </div>
        );
      }}
    </DataLoader>
  );
};
