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
      `flex items-center gap-x-1 tabular-nums ${
        reverse ? 'flex-row-reverse' : 'flex-row'
      }`,
      className,
    )}
  >
    <div className={twMerge('mr-1 flex h-5 w-10', flagClassName)}>
      <Flag
        alt={`${code} flag`}
        code={code.slice(0, 2).toUpperCase()}
        className="h-full object-left-top border"
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
