import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/images/navbar/alnibraslogo.png";
import Searchbox from "./Searchbox";
import { navIcons, navlinks } from "../../constants";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import ResponsiveNav from "./ResponsiveNav";
import Cart from "../../assets/svg/navbar/cart.svg";
import CartSidebar from "../../pages/user/Home/CartSidebar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa6";
import { FaCaretLeft } from "react-icons/fa6";
import { useCategoryList } from "../../api/user/hooks";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/user/CartContext";
const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [navSticky, setNavSticky] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const { data: categories, isLoading: loadingCategories } = useCategoryList()
  const { cart } = useCart()
  const navigate = useNavigate()
  const handleNav = () => {
    setNavOpen(!navOpen);
  };
  const handleCart = () => {
    setCartOpen(!cartOpen);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 64) {
        setNavSticky(true);
      } else {
        setNavSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollRef = useRef();

  const clickLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };
  const clickRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  const goToProductList = (filters) => {
    const params = new URLSearchParams(filters).toString();
    navigate(`/trending?${params}`);
  };

  // Check if scroll buttons should be visible
  const checkScrollPosition = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Show left button only if scrolled to the right
    setShowLeftButton(scrollContainer.scrollLeft > 0);

    // Show right button only if can scroll further right
    const canScrollRight =
      scrollContainer.scrollWidth > scrollContainer.clientWidth &&
      scrollContainer.scrollLeft <
      scrollContainer.scrollWidth - scrollContainer.clientWidth;

    setShowRightButton(canScrollRight);
  };
  // Initial check and event listeners
  useEffect(() => {
    checkScrollPosition();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      }
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: cartOpen ? "75%" : "100%" }}
        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
        className={`   bg-[#005C53] px-5 xl:px-16 py-1 z-50 ${navSticky ? "fixed top-0 left-0 right-0 shadow-md " : "relative"
          }`}
      >
        <div className="flex justify-between items-center">
          <div className="w-1/3 ">
            <Link to="/">
              <img
                src={Logo}
                alt="logo"
                className="object-cover xl:object-contain min-h-10 min-w-16 max-h-15"
              />
            </Link>
          </div>

          <div className="w-1/2">
            <div className="flex gap-x-5 items-center justify-end ">
              <div className="hidden xl:flex w-full xl:w-1/2">
                <Searchbox />
              </div>
              <div className="flex gap-3 xl:gap-4">
                {navIcons.map((item, index) => {
                  const handleIconClick = () => {
                    if (item.name === "profile") {
                      const userId = localStorage.getItem("alNibrazUserId");
                      if (!userId) {
                        localStorage.setItem("redirectAfterLogin", "/profile");
                        navigate("/login");
                      } else {
                        navigate("/profile");
                      }
                    } else {
                      navigate(item.path);
                    }
                  };

                  return (
                    <div key={index}>
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="cursor-pointer"
                        onClick={handleIconClick}
                      />
                    </div>
                  );
                })}
                <div className="relative">
                  <img
                    src={Cart}
                    alt="cart"
                    className="cursor-pointer"
                    onClick={handleCart}
                  />
                  {cart.length > 0 && (
                    <span className="absolute -top-3 -right-2 bg-red-500 text-white
                                   text-xs px-1.5 py-0.5 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex xl:hidden">
                <HiOutlineMenuAlt3
                  color="#FFFFFF"
                  size={25}
                  onClick={handleNav}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden  w-full  h-10 xl:flex items-center">
          {showLeftButton && (
            <div
              className="bg-white/90 hover:bg-white transform transition-colors duration-300 ease-in-out h-full hidden xl:flex items-center px-1 rounded-tl-lg rounded-bl-lg cursor-pointer text-[#00554F]"
              onClick={clickLeft}
            >
              <FaCaretLeft size={20} />
            </div>
          )}
          <div
            ref={scrollRef}
            className="xl:flex overflow-x-auto scrollbar-hide whitespace-nowrap  pt-1 px-2 text-[#F0F0D6] hidden  "
          >
            <div className="flex gap-5 ">
              {!loadingCategories && categories?.length > 0 && categories.map((item, index) => (
                <div key={index} className="relative uppercase group">
                  <h1 className="text-[15px] transition-transform duration-200 ease-in-out 
                                    cursor-pointer group-hover:-translate-y-3" onClick={() => goToProductList({ category: item.Id })}>
                    {item.Name}
                  </h1>
                  <hr className="absolute text-[#F0F0D6] bottom-0 left-0 w-full opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
          {showRightButton && (
            <div
              onClick={clickRight}
              className="bg-white/90 hover:bg-white transform transition-colors duration-300 ease-in-out px-1 h-full hidden xl:flex items-center rounded-tr-lg rounded-br-lg cursor-pointer text-[#00554F]"
            >
              <FaCaretRight size={20} />
            </div>
          )}
        </div>
        <div className="flex xl:hidden">
          <ResponsiveNav open={navOpen} handleClose={handleNav} />
        </div>
      </motion.div>
      <div>
        <CartSidebar cartOpen={cartOpen} handleCart={handleCart} />
      </div>
      {/* <div>
      <CartSideMobile cartOpen={mobileCartOpen} handleCart={handleCart}/>
    </div> */}
    </>
  );
};

export default Navbar;
