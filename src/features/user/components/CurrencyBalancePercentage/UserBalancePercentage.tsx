'use client';

import { use, useState } from 'react';

import SegmentedControl, {
  SegmentedControlOptions,
} from '@components/SegmentedControl';
import {
  UserCurrencyBalance,
  UserBalanceData,
} from '@features/user/interfaces/IUserBalance';
import userCurrenciesAmount from '@features/user/tools/userCurrenciesAmount';
import todayWalletValue from '@features/walletHistory/tools/todayWalletValue';
import { ChartType } from '@interfaces/ICharts';
import { User } from '@interfaces/models/IUser';
import { cutNumber } from '@utils/misc';
import queryClientSide from '@utils/queryClientSide';

import UserBalancePercentageBarChart from './UserBalancePercentageBarChart';
import UserBalancePercentagePieChart from './UserBalancePercentagePieChart';

const percentageValues = async (user: User) => {
  const multiplier = 100;
  const { balance, currencyRates } = await todayWalletValue(user);
  const currencyAmounts = userCurrenciesAmount(user.currencies);

  const transformedNonBaseCurrencies: UserCurrencyBalance[] = currencyRates.map(
    (currency) => {
      const [{ value }] = currency.rates;
      const currencyAmount = currencyAmounts[currency.base];
      const current_currency_value = cutNumber(currencyAmount * value);

      return {
        currency: currency.base,
        value: currencyAmount,
        percentage: cutNumber(
          (current_currency_value / balance) * multiplier,
        ),
        current_currency_value,
      };
    },
  );

  const baseCurrencyValue = cutNumber(currencyAmounts[user.current_currency]);

  const baseCurrency: UserCurrencyBalance = {
    currency: user.current_currency,
    value: baseCurrencyValue,
    percentage: cutNumber((baseCurrencyValue / balance) * multiplier),
    current_currency_value: baseCurrencyValue,
  };
  return {
    balance,
    currencies: [...transformedNonBaseCurrencies, baseCurrency],
  };
};

const UserBalancePercentage = ({ user }: { user: User }) => {
  const [chartType, setChartType] = useState<ChartType>('pie');
  const percentage_values = use(
    queryClientSide<UserBalanceData>('userBalance', () =>
      percentageValues(user),
    ),
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
      <div className="mt-5 h-96 w-144 rounded bg-secondaryBlack px-3 py-2">
        {chartType === 'bar' ? (
          <UserBalancePercentageBarChart
            data={percentage_values.currencies}
            current_currency={user.current_currency}
          />
        ) : (
          <UserBalancePercentagePieChart
            data={percentage_values.currencies}
            current_currency={user.current_currency}
          />
        )}
      </div>
    </div>
  );
};

export default UserBalancePercentage;
