'use client';

import { useState, useEffect } from 'react';

import WorkInProgress from '@components/WorkInProgress';
import { useMultiCurrenciesQuoteCurrency } from '@src/zustand/multiCurrenciesStore';

const MultiCurrenciesPage = () => {
  const [name, setName] = useState('');
  const quoteCurrency = useMultiCurrenciesQuoteCurrency();

  useEffect(() => {
    setName(quoteCurrency.name);
  }, [quoteCurrency.name]);

  return (
    <WorkInProgress />
    // <div className={`${PADDING_TAILWIND} flex flex-1 flex-col pb-4`}>
    //   {/*Page Header */}
    //   <div className="flex w-full flex-col justify-between gap-y-3 pb-1 lg:flex-row">
    //     <div className="flex items-center gap-x-2">
    //       <PageTitle>{'Kursy walut w stosunku do '}</PageTitle>
    //       {!!name && (
    //         <FlagCountryCode
    //           code={name as Currency}
    //           className="gap-x-0"
    //           textClassName="text-xl"
    //         />
    //       )}
    //     </div>
    //   </div>
    //   {!!name && <MultiBaseCurrenciesLineChart />}
    // </div>
  );
};

export default MultiCurrenciesPage;
