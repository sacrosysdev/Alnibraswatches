import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TopNav from '../components/TopNav';

const Layout = ({ children }) => {
    return (
      <div className='font-dm'>
        <TopNav/> 
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    );
  };
  
  export default Layout;