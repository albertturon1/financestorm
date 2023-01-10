'use client';

import { useState } from 'react';

import SegmentedControl, {
  SegmentedControlOptions,
} from '@components/SegmentedControl';
import useCurrentCurrencyRatesData from '@features/main/hooks/useCurrentCurrencyRatesData';
import useGetWalletValue from '@hooks/useGetWalletValue';
import { RechartsData } from '@interfaces/api/ICharts';
import { roundNumber } from '@utils/misc';
import { User } from 'app/user/[id]/page';

import UserBalancePercentageBarChart from './UserBalancepercentageBarChart';
import UserBalancePercentagePieChart from './UserBalancepercentagePieChart';

type Chart = 'bar' | 'pie';

export const BALANCE_PERCENTAGE_COLORS = [
  '#095477',
  '#bc5090',
  '#ff6361',
  '#58508d',
  '#ffa600',
];

const UserBalancePercentage = ({ user }: { user: User }) => {
  const [chartType, setChartType] = useState<Chart>('pie');

  const [currencyRatesData] = useCurrentCurrencyRatesData();
  const {
    walletInBase: { summary, ...data },
    wallet,
  } = useGetWalletValue(user, currencyRatesData);

  const controlOptions: SegmentedControlOptions = {
    buttons: [
      {
        label: 'Kołowy',
        value: 'pie',
        onClick: () => {
          setChartType('pie');
        },
      },
      {
        label: 'Słupkowy',
        value: 'bar',
        onClick: () => {
          setChartType('bar');
        },
      },
    ],
    active: chartType,
  };

  const chartData: RechartsData = [];
  for (const [key, value] of Object.entries(data)) {
    chartData.push({
      name: key.toUpperCase(),
      value: roundNumber((value / summary) * 100, 3),
      quantity: wallet[key],
      baseValue: roundNumber(value, 3),
    });
  }

  return (
    <div className="flex flex-col">
      <p className="mb-2 font-semibold">
        {'Procentowy udział walut w portfelu'}
      </p>
      <SegmentedControl options={controlOptions} />
      <div className="mt-5 h-96 w-144 rounded bg-secondaryBlack px-3 py-2">
        {chartType === 'bar' ? (
          <UserBalancePercentageBarChart data={chartData} />
        ) : (
          <UserBalancePercentagePieChart data={chartData} />
        )}
      </div>
    </div>
  );
};

export default UserBalancePercentage;
