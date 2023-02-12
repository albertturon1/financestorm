const PageTitle = ({
  children,
  className = '',
}: {
  children: string;
  className?: string;
}) => (
  <h1 className={`${className} text-xl font-semibold tracking-wide`}>
    {children}
  </h1>
);

export default PageTitle;
