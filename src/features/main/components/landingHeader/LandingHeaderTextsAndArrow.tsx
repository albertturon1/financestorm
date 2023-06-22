import { ArrowDownRight } from 'lucide-react';

const LandingHeaderTextsAndArrow = () => (
  <div className="min-[1250px]:max-w-3xl flex h-full w-full max-w-md flex-1 flex-col justify-center gap-y-3 self-center text-center text-white xs:max-w-xl sm:gap-y-5 sm:text-left lg:max-w-lg">
    <h1 className="text-[2.2rem] font-bold uppercase leading-[2.75rem] sm:text-[2.7rem] sm:leading-[3.25rem] md:text-[3.3rem] md:leading-[4rem] lg:text-[3.7rem] lg:leading-[4.4rem]">
      {'From digits to wisdom. Turn numbers into knowledge'}
    </h1>
    <p className="max-w-xs self-center text-[1.1rem] leading-7 sm:max-w-sm sm:self-start sm:pl-0 sm:pr-5 lg:text-xl lg:leading-8">
      {'Conquer the world of currency trading with powerful tools and insights'}
    </p>
    <div className="hidden aspect-square w-min items-center justify-center rounded-xl bg-electric_blue p-4 sm:flex">
      <ArrowDownRight size={32} />
    </div>
  </div>
);

export default LandingHeaderTextsAndArrow;
