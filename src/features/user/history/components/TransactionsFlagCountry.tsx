import FlagCountryCode from '@components/FlagCountryCode';

const TransactionsFlagCountry = ({
  currency,
  className = '',
}: {
  currency: string;
  className?: string;
}) => (
  <FlagCountryCode
    code={currency.toUpperCase()}
    boldName={false}
    flagStyle={{
      width: currency.toUpperCase() === 'CHF' ? 22 : 25, //TODO
    }}
    className={`text-sm ${className}`}
  />
);

export default TransactionsFlagCountry;
