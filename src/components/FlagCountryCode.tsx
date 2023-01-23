/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Flag from 'react-world-flags';

import { Currencies } from '@interfaces/ICurrency';

const FLAGS: Record<Currencies, string> = {
  PLN: 'pl',
  EUR: 'EU',
  USD: 'usa',
  CHF: 'che',
  GBP: 'gbr',
};

const FlagCountryCode = ({
  code,
  className,
  flagClassName,
  reverse,
  boldName = true,
  flagStyle,
}: {
  code: string;
  className?: string;
  flagClassName?: string;
  reverse?: boolean;
  boldName?: boolean;
  flagStyle?: React.CSSProperties;
}) => (
  <div
    className={`flex items-center gap-x-1 ${className} ${
      reverse ? 'flex-row-reverse' : 'flex-row'
    }`}
  >
    <div className={`mr-1 w-10 ${flagClassName}`}>
      <Flag
        name={code}
        alt={`${code} flag`}
        code={FLAGS[code]}
        style={flagStyle}
      />
    </div>
    <p className={boldName ? 'font-semibold' : ''}>{`${code}`}&nbsp;</p>
  </div>
);

export default FlagCountryCode;
