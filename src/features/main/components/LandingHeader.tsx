import Image from 'next/image';

import PageMaxWidth from '@components/misc/PageMaxWidth';
import LandingCoin from 'public/assets/images/landing-coin.png';

const LandingHeader = () => (
  <div className="mb-10 w-full py-5 lg:mb-20 lg:py-20">
    <PageMaxWidth>
      <div className="flex flex-1 flex-col gap-x-5 gap-y-10 p-1 xs:p-1.5 sm:flex-row sm:p-6 lg:items-center lg:justify-between lg:p-10">
        {/* Texts */}
        <div className="flex flex-1 flex-col gap-y-5 rounded-2xl bg-navy p-3 text-center text-white xs:p-4 sm:text-start lg:p-5">
          <div className="flex flex-col text-[2rem] font-bold uppercase leading-[2.6rem] lg:text-6xl lg:leading-[4.7rem]">
            <h1>{'Turn numbers into wisdom, simply.'}</h1>
          </div>
          <div className="flex w-full flex-col text-lg font-medium leading-8 lg:text-xl lg:leading-9">
            <p>
              {
                'Conquer the world of currency trading with powerful tools and insights'
              }
            </p>
          </div>
        </div>
        <section className="relative hidden aspect-square min-h-[300px] bg-blue-300  lg:flex">
          <Image
            src={LandingCoin}
            alt="Landing coin"
            fill
            className="object-contain"
          />
        </section>
      </div>
    </PageMaxWidth>
  </div>
);

export default LandingHeader;
