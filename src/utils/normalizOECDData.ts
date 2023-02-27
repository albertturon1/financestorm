import { DateValue } from '@interfaces/ICharts';
import { OECDResponse } from '@src/api/interfaces/IOECDApi';

const normalizOECDData = (data: OECDResponse): DateValue[] => {
  const [{ values }] = data.structure.dimensions.observation.filter(
    (e) => e.id === 'TIME_PERIOD',
  );

  const [{ observations }] = data.dataSets;

  const series = Object.values(observations).map((e) => e[0]);

  return values.map((label, index) => ({
    label: label.id,
    value: series[index],
  }));
};

export default normalizOECDData;
