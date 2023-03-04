import { DateValue } from '@interfaces/ICharts';
import { MonthlyInflationRatesRequest } from '@src/api/interfaces/IOECDApi';
import { getMonthlyCPI } from '@src/api/OECDApi';
import normalizeOECDData from '@utils/normalizeOECDData';

const monthlyInflationData = async ({
  startPeriod,
  endPeriod,
}: MonthlyInflationRatesRequest): Promise<DateValue[]> => {
  const data = await getMonthlyCPI({
    startPeriod,
    endPeriod,
  });

  console.log(JSON.stringify(data))

  // return normalizeOECDData(data);
};

export default monthlyInflationData;
