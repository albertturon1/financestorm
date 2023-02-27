import { DateValue } from '@interfaces/ICharts';
import { MonthlyInflationRatesRequest } from '@src/api/interfaces/IOECDApi';
import { getMonthlyInflationRates } from '@src/api/OECDApi';
import normalizOECDData from '@utils/normalizOECDData';

const monthlyInflationData = async ({
  startPeriod,
  endPeriod,
}: MonthlyInflationRatesRequest): Promise<DateValue[]> => {
  const data = await getMonthlyInflationRates({
    startPeriod,
    endPeriod,
  });

  return normalizOECDData(data);
};

export default monthlyInflationData;
