import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import MobileNavItem from './MobileNavItem';
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from '@clerk/clerk-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full transition-all duration-300 bg-white/80 backdrop-blur-md">
      <div className="container flex items-center justify-between px-4 py-4 pt-4 mx-auto">
        <Link
          to="/"
          className="text-xl font-semibold text-pink-500 select-none hover:text-pink-600"
        >
          store
        </Link>

        {/* Desktop navigation */}
        <nav className="items-center hidden gap-8 text-lg md:flex">
          <NavItem to="/" label="home" />
          <NavItem to="/categories" label="categories" />
          <NavItem to="/cart" label="cart" />

          {/* Auth buttons */}
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-1 ml-4 text-white bg-pink-500 rounded-full hover:bg-pink-600">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>

        {/* Mobile menu button */}
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md">
          <nav className="flex flex-col items-center gap-4 py-4">
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

            {/* Mobile auth */}
            <SignedOut>
              <SignInButton>
                <button className="text-pink-500 hover:text-pink-600">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
