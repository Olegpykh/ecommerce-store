import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300 
        backdrop-blur-md 
        ${isScrolled ? 'bg-white/90 shadow-md' : 'bg-white/30 shadow-none'}
      `}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600 select-none">
          Store
        </Link>

        <nav className="hidden md:flex gap-8 text-lg">
          <NavItem to="/" label="Home" />
          <NavItem to="/categories" label="Categories" />
          <NavItem to="/cart" label="Cart" />
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-6 h-0.5 bg-gray-800 transition ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-800 transition ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-800 transition ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-md">
          <nav className="flex flex-col items-center py-4 gap-4 text-lg">
            <MobileNavItem
              to="/"
              label="Home"
              onClick={() => setMenuOpen(false)}
            />
            <MobileNavItem
              to="/categories"
              label="Categories"
              onClick={() => setMenuOpen(false)}
            />
            <MobileNavItem
              to="/cart"
              label="Cart"
              onClick={() => setMenuOpen(false)}
            />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

const NavItem = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `
      relative pb-1 transition 
      ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}
      group
    `
    }
  >
    {label}

    <span
      className="
        absolute left-0 -bottom-0.5 w-0 h-[2px] bg-blue-600 
        transition-all duration-300 group-hover:w-full
      "
    />
  </NavLink>
);

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
      ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}
    `
    }
  >
    {label}
  </NavLink>
);
