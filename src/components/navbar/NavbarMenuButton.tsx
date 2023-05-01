const NavbarMenuButton = ({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="focus:ring-ring flex flex-col items-center justify-center rounded-md p-2 py-4 focus:outline-none focus:ring-2 focus:ring-inset sm:hidden"
  >
    <div
      className={`h-[0.4px] w-6 bg-navy transition duration-300 ${
        open ? 'translate-y-[1px] rotate-45' : '-translate-y-1'
      }`}
    />
    <div
      className={`h-[0.4px] w-6 bg-navy transition duration-300 ${
        open ? '-rotate-45' : 'translate-y-1'
      }`}
    />
  </button>
);

export default NavbarMenuButton;
