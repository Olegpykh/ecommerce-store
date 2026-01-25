import { NavLink } from "react-router-dom";

const NavItem = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `
      relative pb-1 transition dark:text-white
      ${isActive ? 'text-black font-semibold' : 'text-gray-700'}
      group
    `
    }
  >
    {label}

    <span
      className="
        absolute left-0 -bottom-0.5 w-0 h-[2px] bg-pink-400
        transition-all duration-300 group-hover:w-full
      "
    />
  </NavLink>
);
export default NavItem