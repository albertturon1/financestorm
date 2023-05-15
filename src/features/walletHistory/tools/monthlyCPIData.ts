import { getMonthlyCPI } from '@src/api/OECDApi';

import { DateValue } from '@interfaces/ICharts';
import { MonthlyCPIRequest } from '@src/api/interfaces/IOECDApi';
import normalizeOECDData from '@utils/normalizeOECDData';

const monthlyCPIData = async ({
  startPeriod,
  endPeriod,
}: MonthlyCPIRequest): Promise<DateValue[]> => {
  const data = await getMonthlyCPI({
    startPeriod,
    endPeriod,
  });
  if (!data) return [];
  return normalizeOECDData(data);
};

export default monthlyCPIData;
