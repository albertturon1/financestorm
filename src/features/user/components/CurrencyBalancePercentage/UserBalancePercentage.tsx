'use client';

import { use, useState } from 'react';

import SegmentedControl, {
  SegmentedControlOptions,
} from '@components/SegmentedControl';
import todayWalletValue, {
  isBaseCurrencyWalletValue,
} from '@features/walletHistory/tools/todayWalletValue';
import { ChartType } from '@interfaces/ICharts';
import { User } from '@interfaces/models/IUser';
import { cutNumber } from '@utils/misc';
import queryClientSide from '@utils/queryClientSide';

import UserBalancePercentageBarChart from './UserBalancePercentageBarChart';
import UserBalancePercentagePieChart from './UserBalancePercentagePieChart';

const percentageValues = async (user: User) => {
  const { balance, currencies } = await todayWalletValue(user);

  const transformedNonBaseCurrencies = currencies.map((c) => ({
    ...c,
    value: isBaseCurrencyWalletValue(c) ? c.value : c.amount,
    percentage: cutNumber(
      ((isBaseCurrencyWalletValue(c) ? c.value : c.amount) / balance) * 100,
      2,
    ),
  }));

  return {
    balance,
    currencies: transformedNonBaseCurrencies,
  };
};

const UserBalancePercentage = ({ user }: { user: User }) => {
  const [chartType, setChartType] = useState<ChartType>('pie');
  const percentage_values = use(
    queryClientSide(['userBalance'], () => percentageValues(user)),
  );

  //console.log(percentage_values);

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
          <UserBalancePercentageBarChart
            data={percentage_values.currencies}
            quote_currency={user.quote_currency}
          />
        ) : (
          <UserBalancePercentagePieChart
            data={percentage_values.currencies}
            quote_currency={user.quote_currency}
          />
        )}
      </div>
    </div>
  );
};

export default UserBalancePercentage;
