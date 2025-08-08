import React, { ReactNode } from 'react';
import Navbar from '@components/layout/Header/Navbar';
import Footer from '@components/layout/Footer/footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;