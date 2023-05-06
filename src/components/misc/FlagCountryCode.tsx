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
      `flex items-center gap-x-1.5 tabular-nums xs:gap-x-2 ${
        reverse ? 'flex-row-reverse' : 'flex-row'
      }`,
      className,
    )}
  >
    <div className={twMerge('flex h-5', flagClassName)}>
      <Flag
        alt={`${code} flag`}
        code={code.slice(0, 2).toUpperCase()}
        className="w-[28px] object-contain object-left lg:w-[36px]"
        style={flagStyle}
      />
    </div>
    <p
      className={twMerge(
        `w-max text-sm tabular-nums ${
          boldName ? 'font-medium' : ''
        }`,
        textClassName,
      )}
    >
      {code.toUpperCase()}
    </p>
  </div>
);

export default FlagCountryCode;
