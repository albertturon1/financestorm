import { PuffLoader } from 'react-spinners';

const Loader = () => (
  <div className="flex h-full w-full items-center justify-center self-center">
    <PuffLoader className="h-full w-full" color={'green'} />
  </div>
);

export default Loader;
