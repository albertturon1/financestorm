import { twMerge } from 'tailwind-merge';

import CurrencyRatesListButton from './CurrencyRatesListButton';
import { CurrencyRatesListItemStyleProps } from './CurrencyRatesListItem';

const CurrencyRatesListLegend = ({
  rowStyle,
  changeStyle,
  chartStyle,
  amountStyle,
  currencyStyle,
  dataTimespan,
  showGoToAllButton,
}: {
  dataTimespan: number;
  showGoToAllButton: boolean;
} & CurrencyRatesListItemStyleProps) => (
  <div className={twMerge(rowStyle, 'h-12 border-0 xs:h-14')}>
    <p className={twMerge(currencyStyle, 'text-base')}>{'Currency'}</p>
    <p className={amountStyle}>{'Amount'}</p>
    <p className={changeStyle}>{`Change (${dataTimespan}d)`}</p>
    <p className={chartStyle}>{`Chart (${dataTimespan}d)`}</p>
    {showGoToAllButton && (
      <CurrencyRatesListButton
        href={{
          pathname: '/currencies',
        }}
      >
        {'All'}
      </CurrencyRatesListButton>
    )}
  </div>
);

export default CurrencyRatesListLegend;
