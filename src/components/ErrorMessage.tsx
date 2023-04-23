const ErrorMessage = ({ error }: { error?: string }) => (
  <div className="flex flex-1 items-center justify-center">
    {error ?? <p>{'Error...'}</p>}
  </div>
);

export default ErrorMessage;
