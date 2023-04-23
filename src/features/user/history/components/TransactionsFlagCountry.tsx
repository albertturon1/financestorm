import FlagCountryCode from '@components/FlagCountryCode';
import { Currency } from '@interfaces/ICurrency';

const TransactionsFlagCountry = ({
  currency,
  className = '',
}: {
  currency: string;
  className?: string;
}) => (
  <FlagCountryCode
    code={currency.toUpperCase() as Currency}
    boldName={false}
    flagStyle={{
      width: currency.toUpperCase() === 'CHF' ? 22 : 25, //TODO
    }}
    className={`text-sm ${className}`}
  />
);

export default TransactionsFlagCountry;
