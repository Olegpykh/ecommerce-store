import { NavLink } from "react-router-dom";
 const MobileNavItem = ({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `
      text-lg transition 
      ${isActive ? 'text-pink-400 font-semibold' : 'text-gray-700'}
    `
    }
  >
    {label}
  </NavLink>
);


export default MobileNavItem
