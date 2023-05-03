import { twMerge } from 'tailwind-merge';

import { CurrencyRatesListItemStyleProps } from './CurrencyRatesListItem';
import NavigationButton from '../misc/NavigationButton';

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
      <div className='flex flex-1 h-full justify-end'>
        <NavigationButton href="/currencies">
          {'All'}
        </NavigationButton>
      </div>
    )}
  </div>
);

export default CurrencyRatesListLegend;
