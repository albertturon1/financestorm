import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Currency } from '@interfaces/ICurrency';

import CustomDropdownListDefaultItemSelector from './customDropdownList/CustomDropdownListDefaultItemSelector';
import FlagCountryCode from './FlagCountryCode';

const CurrenciesChecbkoxList = ({
  title,
  currencies,
  onClick,
}: {
  title: string;
  currencies: readonly Currency[];
  onClick: (currency: Currency) => void;
}) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <button className="IconButton" aria-label="Customise options">
        <p>{title}</p>
      </button>
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
        {currencies.map((currency, index) => (
          <DropdownMenu.Item key={currency} className="DropdownMenuItem">
            <button
              onClick={() => {
                onClick(currency);
              }}
              className={`flex w-full items-center gap-x-5 border-t px-4 py-2 ${
                index === 0 ? 'border-t-0' : ''
              }`}
            >
              <CustomDropdownListDefaultItemSelector checked />
              <FlagCountryCode code={currency} />
            </button>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

export default CurrenciesChecbkoxList;
