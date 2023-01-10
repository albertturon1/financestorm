const PageTitle = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => (
  <h1
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    className={`${className} text-2xl font-semibold tracking-wide underline
  `}
  >
    {children}
  </h1>
);

export default PageTitle;
