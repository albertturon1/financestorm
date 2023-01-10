import { PuffLoader } from 'react-spinners';

const Loader = () => (
  <div className="flex w-full items-center justify-center self-center p-10">
    <PuffLoader className="h-full w-full" color={'green'} />
  </div>
);

export default Loader;
