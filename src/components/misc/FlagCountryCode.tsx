import Flag from 'react-world-flags';
import { twMerge } from 'tailwind-merge';

import { Currency } from '@interfaces/ICurrency';

const FlagCountryCode = ({
  code,
  className = '',
  flagClassName = '',
  textClassName = '',
  reverse,
  boldName = true,
  flagStyle,
}: {
  code: Currency;
  className?: string;
  flagClassName?: string;
  textClassName?: string;
  reverse?: boolean;
  boldName?: boolean;
  flagStyle?: React.CSSProperties;
}) => (
  <div
    className={twMerge(
      `flex items-center gap-x-1.5 xs:gap-x-2 tabular-nums ${
        reverse ? 'flex-row-reverse' : 'flex-row'
      }`,
      className,
    )}
  >
    <div className={twMerge('flex h-5 object-contain', flagClassName)}>
      <Flag
        alt={`${code} flag`}
        code={code.slice(0, 2).toUpperCase()}
        className="w-7 lg:w-9 object-left-top"
        style={flagStyle}
      />
    </div>
    <p
      className={twMerge(
        `w-max tabular-nums ${boldName ? 'font-semibold' : ''}`,
        textClassName,
      )}
    >
      {code.toUpperCase()}
    </p>
  </div>
);

export default FlagCountryCode;
