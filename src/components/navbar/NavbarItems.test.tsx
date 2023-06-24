import { render, screen } from '@testing-library/react';

import NavbarItems from './NavbarItems';

describe('NavbarItems', () => {
  beforeEach(() => {
    render(<NavbarItems />);
  });

  it(`should have 4 links in NavbarItems`, () => {
    const [NavbarItems] = screen.queryAllByTestId('NavbarItems');

    expect(NavbarItems).toBeDefined();
    expect(NavbarItems?.children).toHaveLength(4);
    expect(NavbarItems?.children[0]).toHaveClass('sm:hidden'); //hompage
  });
});
