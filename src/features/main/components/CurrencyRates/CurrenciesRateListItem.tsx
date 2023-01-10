'use client';
import Link from 'next/link';
import { AiOutlineDash } from 'react-icons/ai';
import { BsArrowDownSquareFill, BsArrowUpSquareFill } from 'react-icons/bs';

import FlagCountryCode from '@components/FlagCountryCode';
import { CurrencyResponse } from '@features/main/hooks/useCurrentCurrencyRatesData';
import { roundNumber } from '@utils/misc';

const getDailyChangePercent = (present: number, past: number) =>
  roundNumber(((present - past) / past) * 100, 2);

const roundField = (value: number) => roundNumber(value, 5);

const dailyChangeStyle = (change: number) => {
  if (change === 0) return 'text-slate-500';
  if (change > 0) return 'text-green-500';
  return 'text-red-500';
};

const CurrenciesRateListItem = ({
  item,
  className,
  style,
}: {
  item: CurrencyResponse | undefined;
  className?: string;
  style: string;
}) => {
  if (!item) return null;
  const { present, past } = item;
  const dailyChange = present.exchange_rate - past.exchange_rate;
  const dailyChangePercent = getDailyChangePercent(
    present.exchange_rate,
    past.exchange_rate,
  );

  return (
    <Link
      href={`/currencies/${encodeURIComponent(
        `${present.from_currency_code}-${present.to_currency_code}`,
      )}`}
    >
      <div
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        className={`${className} hover:cursor-pointers flex h-14 w-full items-center`}
      >
        <FlagCountryCode code={present.from_currency_code} className={style} />
        <p className={style}>{roundField(present.bid_price)}</p>
        <p className={style}>{roundField(present.ask_price)}</p>
        <p className={style}>{roundField(present.exchange_rate)}</p>
        <div className={`flex items-center gap-x-3 ${style} `}>
          <DailyChange change={dailyChangePercent} />
          <p
            className={`${dailyChangeStyle(dailyChangePercent)}`}
          >{`${dailyChangePercent}%`}</p>
        </div>
        <p className={style}>
          {dailyChange < 0
            ? roundField(dailyChange)
            : `\u00A0${roundField(dailyChange)}`}{' '}
          {/*spacja do wyrównania minusów */}
        </p>
        <p className={style}>{present.last_refreshed.split(' ')[1]}</p>
      </div>
    </Link>
  );
};

const DailyChange = ({ change }: { change: number }) => {
  const style = `w-5 h-5 ${dailyChangeStyle(change)}`;
  if (change === 0) return <AiOutlineDash className={style} />;
  if (change > 0) return <BsArrowUpSquareFill className={style} />;
  return <BsArrowDownSquareFill className={style} />;
};

export default CurrenciesRateListItem;
