import Flag from 'react-world-flags';
import { twMerge } from 'tailwind-merge';

import { Currencies } from '@interfaces/ICurrency';

const FlagCountryCode = ({
  code,
  className = '',
  flagClassName = '',
  textClassName = '',
  reverse,
  boldName = true,
  flagStyle,
}: {
  code: Currencies;
  className?: string;
  flagClassName?: string;
  textClassName?: string;
  reverse?: boolean;
  boldName?: boolean;
  flagStyle?: React.CSSProperties;
}) => (
  <div
    className={twMerge(
      `flex items-center gap-x-1 tabular-nums ${
        reverse ? 'flex-row-reverse' : 'flex-row'
      }`,
      className,
    )}
  >
    <div className={twMerge('mr-1 flex h-6 w-10', flagClassName)}>
      <Flag
        alt={`${code} flag`}
        code={code.slice(0, 2).toUpperCase()}
        className="h-full object-left-top"
        style={flagStyle}
      />
    </div>
    <p
      className={twMerge(
        `${reverse ? 'w-10' : ''} ${boldName ? 'font-semibold' : ''}`,
        textClassName,
      )}
    >
      {code.toUpperCase()}
    </p>
  </div>
);

export default FlagCountryCode;
