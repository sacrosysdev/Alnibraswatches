import React, { useEffect, useState } from 'react'
import Logo from '../assets/images/navbar/alnibraslogo.png'
import Searchbox from './Searchbox'
import { navIcons, navlinks } from '../constants'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import ResponsiveNav from './ResponsiveNav';
import Cart from '../assets/svg/navbar/cart.svg';
import CartSidebar from '../pages/Home/CartSidebar';
import { motion } from 'framer-motion';
import CartSideMobile from '../pages/Home/CartSideMobile';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileCartOpen, setMobileCartOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [navSticky, setNavSticky] = useState(false)

  const handleNav = () => {
    setNavOpen(!navOpen)
  }
  const handleCart = () => {
    // if (window.innerWidth >=768) {
      setCartOpen(!cartOpen); 
    // } else {
    //   setMobileCartOpen(!mobileCartOpen)
      
    // }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 64) {
        setNavSticky(true);
      } else {
        setNavSticky(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    handleScroll();
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <motion.div
    initial={{ width: "100%" }}
    animate={{ width: cartOpen ? "75%" : "100%" }}
    transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
    className={`   bg-[#005C53] px-5 xl:px-16 py-5 z-50 ${navSticky ? 'fixed top-0 left-0 right-0 shadow-md ' : 'relative'}`}>
      <div className='flex justify-between items-center'>
        
          <div className='w-1/3'>
            <img src={Logo} alt="logo" className='object-cover xl:object-contain min-h-10 min-w-20' />
          </div>
        
        <div className='w-1/2'>
          <div className='flex gap-x-5 items-center justify-end '>
            <div className='hidden xl:flex w-full xl:w-1/2'>
              <Searchbox />
            </div>
            <div className='flex gap-3'>
              {navIcons.map((item, index) => (<div key={index}>
                <img src={item.icon} alt={item.name} className='cursor-pointer'/>
              </div>))}
              <div>
                <img src={Cart} alt="cart" className='cursor-pointer' onClick={handleCart}/>
              </div>
            </div>
            <div className='flex xl:hidden'>
              <HiOutlineMenuAlt3 color='#FFFFFF' size={25} onClick={handleNav} className='cursor-pointer' />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full'>
        
        <div className='xl:flex overflow-x-auto scrollbar-hide whitespace-nowrap justify-start items-end pt-2  text-[#F0F0D6] hidden'>
          <div className='flex gap-5 '>
            {navlinks.map((item, index) => (
              <div key={index} className='relative uppercase group'>
                <h1 className=' text-lg transition-transform duration-200 ease-in-out cursor-pointer group-hover:-translate-y-3'>
                  {item}
                </h1>
                <hr className='absolute text-[#F0F0D6] bottom-0 left-0 w-full opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100 pointer-events-none' />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex xl:hidden'>
        <ResponsiveNav open={navOpen} handleClose = {handleNav}/>
      </div>
    </motion.div>
    <div>
      <CartSidebar cartOpen={cartOpen} handleCart={handleCart}/>
    </div>
    {/* <div>
      <CartSideMobile cartOpen={mobileCartOpen} handleCart={handleCart}/>
    </div> */}
    </>
  )
}

export default Navbar