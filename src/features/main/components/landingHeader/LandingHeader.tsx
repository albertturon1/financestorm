import '@styles/global.css';

import Image from 'next/image';

import PageMaxWidth from '@components/misc/PageMaxWidth';
import PagePadding from '@components/misc/PagePadding';
import LandingPhone from 'public/assets/images/landing-phone.webp';

import LandingHeaderTextsAndArrow from './LandingHeaderTextsAndArrow';

export const LandingHeader = () => (
  <div className="landing-header relative mb-10 flex w-full items-stretch lg:mb-20">
    <div className="flex flex-1 bg-black/40 py-7 sm:py-10">
      <PageMaxWidth flex>
        <PagePadding flex>
          <div className="flex h-full w-full flex-col justify-between gap-x-1 gap-y-6 sm:flex-row sm:gap-x-3 lg:pr-[10%]">
            <LandingHeaderTextsAndArrow />
            <div className="relative flex h-[330px] w-[150px] items-center justify-center self-center sm:mt-[5%] sm:h-[430px] sm:w-[200px] sm:self-start md:h-[510px] md:w-[215px] lg:h-[550px]">
              <Image
                src={LandingPhone}
                alt="LandingPhone"
                fill
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </PagePadding>
      </PageMaxWidth>
    </div>
  </div>
);
