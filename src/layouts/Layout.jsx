import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TopNav from '../components/TopNav';
import BelowFooter from '../components/BelowFooter';

const Layout = ({ children }) => {
    return (
      <div className='font-dm'>
        <div className=''>
          <TopNav/> 
        </div>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BelowFooter/>
      </div>
    );
  };
  
  export default Layout;