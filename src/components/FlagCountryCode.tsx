/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Flag from 'react-world-flags';

import { CurrencyCodes } from '@interfaces/ICurrency';

const FLAGS: Record<CurrencyCodes, string> = {
  pln: 'pl',
  eur: 'EU',
  usd: 'usa',
  chf: 'che',
  gbp: 'gbr',
};

const FlagCountryCode = ({
  code,
  className,
  flagClassName,
  reverse,
}: {
  code: string;
  className?: string;
  flagClassName?: string;
  reverse?: boolean;
}) => (
  <div
    className={`flex items-center gap-x-1 ${className} ${
      reverse ? 'flex-row-reverse' : 'flex-row'
    }`}
  >
    <div className={`mr-1 w-10 ${flagClassName}`}>
      <Flag
        name={code.toUpperCase()}
        alt={`${code.toUpperCase()} flag`}
        code={FLAGS[code as CurrencyCodes]}
      />
    </div>
    <p className="font-semibold">{`${code.toUpperCase()}`}&nbsp;</p>
  </div>
);

export default FlagCountryCode;
