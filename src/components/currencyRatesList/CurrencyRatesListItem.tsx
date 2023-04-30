import '@styles/global.css';

import dynamic from 'next/dynamic';

import FlagCountryCode from '@components/misc/FlagCountryCode';
import SkeletonLoader from '@components/ui/SkeletonLoader';
import { SeparateDailyCurrencyRates } from '@interfaces/models/IExchangerate';
import { cutNumber, valuesDifferenceInPercentage } from '@utils/misc';

import CurrencyRatesListButton from './CurrencyRatesListButton';

const CurrencyRatesListItemChart = dynamic(
  () => import('./CurrencyRatesListItemChart'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center p-4">
        <SkeletonLoader className="h-[3px] w-full -rotate-12" />
      </div>
    ),
  },
);

export function chartColor(rates: number[]) {
  const differenceInPercentage = valuesDifferenceInPercentage(rates);
  if (differenceInPercentage < 0) return 'rgb(220 38 38)'; //red
  if (differenceInPercentage > 0) return 'rgb(21 128 61)'; //green
  return 'rgb(55 65 81)';
}

const CurrencyRatesListItem = ({
  currencyRates,
  rowStyle,
  changeStyle,
  chartStyle,
  amountStyle,
  currencyStyle,
}: {
  currencyRates: SeparateDailyCurrencyRates;
  rowStyle: string;
  changeStyle: string;
  chartStyle: string;
  amountStyle: string;
  currencyStyle: string;
}) => {
  const values = currencyRates.rates.map((r) => r.value);
  const differenceInPercentage = cutNumber(
    valuesDifferenceInPercentage(values),
    3,
  );

  return (
    <div className={rowStyle}>
      <div className={currencyStyle}>
        <FlagCountryCode
          code={currencyRates.base_currency}
          flagClassName="w-7 w-9"
        />
      </div>
      {/* Lastest vale */}
      <p className={amountStyle}>{currencyRates.rates.slice(-1)[0].value}</p>
      {/* Change */}
      <p
        className={changeStyle}
        style={{
          color: chartColor(values),
        }}
      >{`${differenceInPercentage}%`}</p>
      {/* Chart */}
      <div className={`${chartStyle} h-full w-full`}>
        <CurrencyRatesListItemChart rates={currencyRates.rates} />
      </div>
      {/* Button to selected currency */}
      <CurrencyRatesListButton
        href={{
          pathname: `/currencies/${currencyRates.base_currency}-${currencyRates.quote_currency}`,
        }}
      />
    </div>
  );
};

export default CurrencyRatesListItem;
