import { render, screen } from '@testing-library/react';

import Navbar from '@components/navbar';
import { APP_TITLE } from '@constants/global';

import { MOBILE_NAVBAR_BREAKPOINT } from './hooks/useCloseNavbar';

describe('Navbar', () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  it('should have Logo with <Link />', () => {
    const NavbarLogoLink = screen.getByTestId('NavbarLogoLink');

    expect(NavbarLogoLink).toBeDefined();
    expect(NavbarLogoLink).toHaveAttribute('href', '/');
    expect(NavbarLogoLink.children[0]).toHaveTextContent(APP_TITLE);
  });

  it(`should have NavbarMenuButton visible when screenWidth < ${MOBILE_NAVBAR_BREAKPOINT}`, () => {
    const NavbarMenuButton = screen.queryByTestId('NavbarMenuButton');

    expect(NavbarMenuButton).toBeDefined();
    expect(NavbarMenuButton).toHaveClass('sm:hidden');
    expect(NavbarMenuButton).toHaveClass('flex');
  });

  it(`should have NavbarItemsMobileWrapper visible when screenWidth < ${MOBILE_NAVBAR_BREAKPOINT}`, () => {
    const NavbarItemsMobileWrapper = screen.queryByTestId(
      'NavbarItemsMobileWrapper',
    );

    expect(NavbarItemsMobileWrapper).toBeDefined();
    expect(NavbarItemsMobileWrapper).toHaveClass('sm:hidden');
    expect(NavbarItemsMobileWrapper).toHaveClass('fixed');
  });

  it(`should have NavbarItemsDesktopWrapper visible when screenWidth >= ${MOBILE_NAVBAR_BREAKPOINT}`, () => {
    const NavbarItemsDesktopWrapper = screen.getByTestId(
      'NavbarItemsDesktopWrapper',
    );

    expect(NavbarItemsDesktopWrapper).toBeDefined();
    expect(NavbarItemsDesktopWrapper).toHaveClass('hidden');
    expect(NavbarItemsDesktopWrapper).toHaveClass('sm:flex');
  });
});
