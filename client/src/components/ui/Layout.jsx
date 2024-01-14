import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import Footer from './Footer';
import Search from './Search';

const Layout = () => {
  return (
    <>
      <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
