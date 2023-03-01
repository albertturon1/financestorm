'use client';

import { use, useState } from 'react';

import SegmentedControl, {
  SegmentedControlOptions,
} from '@components/SegmentedControl';
import todayWalletValue from '@features/walletHistory/tools/todayWalletValue';
import { ChartType } from '@interfaces/ICharts';
import { User } from '@interfaces/models/IUser';
import queryClientSide from '@utils/queryClientSide';

import UserBalancePercentageBarChart from './UserBalancePercentageBarChart';
import UserBalancePercentagePieChart from './UserBalancePercentagePieChart';

const UserBalancePercentage = ({ user }: { user: User }) => {
  const [chartType, setChartType] = useState<ChartType>('pie');
  const { currencies } = use(
    queryClientSide(['userBalance'], () => todayWalletValue(user)),
  );

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

  return (
    <div className="flex flex-col">
      <p className="mb-2 font-semibold">
        {'Procentowy udział walut w portfelu'}
      </p>
      <SegmentedControl options={controlOptions} />
      <div className="mt-5 h-96 w-96 rounded bg-secondaryBlack px-3 py-2 lg:w-128">
        {chartType === 'bar' ? (
          <UserBalancePercentageBarChart data={currencies} />
        ) : (
          <UserBalancePercentagePieChart data={currencies} />
        )}
      </div>
    </div>
  );
};

export default UserBalancePercentage;
