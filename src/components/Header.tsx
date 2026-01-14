import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import MobileNavItem from './MobileNavItem';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full transition-all duration-300 bg-white/80 backdrop-blur-md">
      <div className="container flex items-center justify-between px-4 py-4 pt-4 mx-auto">
        <Link to="/" className="text-xl font-semibold text-pink-400 select-none hover:text-pink-500">
          store
        </Link>

        <nav className="hidden gap-8 text-lg md:flex">
          <NavItem to="/" label="home" />
          <NavItem to="/categories" label="categories" />
          <NavItem to="/cart" label="cart" />
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
        <div className="md:hidden bg-white/95 backdrop-blur-md">
          <nav className="flex flex-col items-center gap-4">
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
