import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector((state: RootState) => state.theme.value);
 

  return (
    <div
      className={`${theme === 'dark' ? 'dark' : ''} flex flex-col min-h-screen`}
    >
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
