import { DateValue } from '@interfaces/ICharts';
import { MonthlyInflationRatesRequest } from '@src/api/interfaces/IOECDApi';
import { getMonthlyInflationRates } from '@src/api/OECDApi';
import normalizeOECDData from '@utils/normalizeOECDData';

const monthlyInflationData = async ({
  startPeriod,
  endPeriod,
}: MonthlyInflationRatesRequest): Promise<DateValue[]> => {
  const data = await getMonthlyInflationRates({
    startPeriod,
    endPeriod,
  });

  return normalizeOECDData(data);
};

export default monthlyInflationData;
