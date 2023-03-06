import { DateValue } from '@interfaces/ICharts';
import { MonthlyInflationRatesRequest } from '@src/api/interfaces/IOECDApi';
import { getMonthlyCPI } from '@src/api/OECDApi';
import normalizeOECDData from '@utils/normalizeOECDData';

const monthlyCPIData = async ({
  startPeriod,
  endPeriod,
}: MonthlyInflationRatesRequest): Promise<DateValue[]> => {
  const data = await getMonthlyCPI({
    startPeriod,
    endPeriod,
  });
  if (!data) return [];
  return normalizeOECDData(data);
};

export default monthlyCPIData;
