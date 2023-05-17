import { DateValue } from '@interfaces/ICharts';
import { OECDResponse } from '@src/api/interfaces/IOECDApi';

function normalizeOECDData(data: undefined): undefined;
function normalizeOECDData(data: OECDResponse): DateValue[];
function normalizeOECDData(data: OECDResponse | undefined) {
  if (
    !data ||
    data.structure.dimensions.observation.length === 0 ||
    data.structure.dimensions.observation.filter((e) => e.id === 'TIME_PERIOD')
      .length === 0
  )
    return;

  const [{ values }] = data.structure.dimensions.observation.filter(
    (e) => e.id === 'TIME_PERIOD',
  );

  const [{ observations }] = data.dataSets;

  const series = Object.values(observations).map((e) => e[0]);

  return values.map((label, index) => ({
    date: label.id,
    value: series[index],
  }));
}

export default normalizeOECDData;
