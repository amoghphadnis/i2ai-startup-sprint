import React, { ReactNode } from 'react';
import Navbar from '@components/layout/Header/Navbar';
import Footer from '@components/layout/Footer/footer';
import ScrollToTop from '@components/common/ScrollToTop';
import { CustomScrollbar } from '@components/common/CustomScrollbar';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
      <CustomScrollbar />
    </>
  );
};

export default MainLayout;