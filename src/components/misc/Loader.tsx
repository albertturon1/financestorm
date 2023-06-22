const Loader = ({ message }: { message?: string }) => (
  <div className="flex flex-1 items-center justify-center">
    {message ?? <p>{'Loading...'}</p>}
  </div>
);

export default Loader;
