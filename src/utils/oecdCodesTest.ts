import { OECD_COUNTRIES } from '@constants/currencies';

import { objectEntries } from './misc';

// code for testing OECD_COUNTRIES
const promises = objectEntries(OECD_COUNTRIES).map(([key, value]) => {
  const currency = value.toUpperCase();
  const url = `https://stats.oecd.org/sdmx-json/data/DP_LIVE/${currency}.CPI.TOT.IDX2015.M/OECD?dimensionAtObservation=allDimensions&endPeriod=2023-05-16&startPeriod=2022-04-01`;

  return (
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${currency} promise rejected`);
        }
        return response.json();
      })
      .then(() => [key, value])
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .catch((error) => [key, value, error])
  );
});

void Promise.all(promises).then((results) => {
  const rejectedPairs = results.filter((result) => result.length === 3);
  // eslint-disable-next-line no-console
  console.log(rejectedPairs);
});
