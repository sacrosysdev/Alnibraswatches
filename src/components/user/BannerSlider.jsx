import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useBannerList } from "../../api/user/hooks";
import { useNavigate } from "react-router-dom";
const BannerSlider = () => {
  const { data: banners, isLoading: loadingBanner } = useBannerList();
  var settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
  };
  const navigate = useNavigate();
  const bannerItem = banners?.[0];
  const mobileImages = bannerItem?.MobileBrandingData
    ? JSON.parse(bannerItem.MobileBrandingData)[0]
    : {};
  const tabImages = bannerItem?.TabBrandingData
    ? JSON.parse(bannerItem.TabBrandingData)[0]
    : {};
  const webImages = bannerItem?.WebBrandingData
    ? JSON.parse(bannerItem.WebBrandingData)[0]
    : {};

  const extractUrls = (dataObj) => {
    return Object.values(dataObj || {}).filter(
      (url) => typeof url === "string" && url.trim() !== ""
    );
  };

  const mobileSlides = extractUrls(mobileImages);
  const tabSlides = extractUrls(tabImages);
  const webSlides = extractUrls(webImages);
  console.log(banners);
  const shopNowHandler = () => {
    navigate(`/trending`);
  };
  return (
    <div className="">
      {/* Mobile View  */}
      <div className="block md:hidden">
        <Slider {...settings}>
          {mobileSlides.map((img, idx) => (
            <div key={`mobile-${idx}`}>
              <img
                src={img}
                alt={`mobile-banner-${idx}`}
                className="w-full h-[80vh] object-cover"
              />
              <div className="absolute left-4 top-6 w-11/12">
                <motion.h1
                  className="text-3xl font-bold text-white leading-tight pt-5"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Welcome to <br /> AL NIBRAS Watches
                </motion.h1>
                <motion.p
                  className="text-xl text-white mt-2"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  {"Step into a world where tradition meets innovation "}
                </motion.p>
                <motion.button
                  className="mt-6 px-6 py-3 border border-white text-white
                             bg-transparent rounded-md cursor-pointer
                           hover:bg-white hover:text-black transition-all duration-300"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  onClick={shopNowHandler}
                >
                  Shop Now
                </motion.button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Tablet View */}
      <div className="hidden md:block xl:hidden">
        <Slider {...settings}>
          {tabSlides.map((img, idx) => (
            <div key={`tab-${idx}`}>
              <img
                src={img}
                alt={`tab-banner-${idx}`}
                className="w-full h-[70vh] object-cover"
              />
              <div className="absolute left-4 top-6 w-11/12">
                <motion.h1
                  className="text-5xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Welcome to <br /> AL NIBRAS Watches
                </motion.h1>
                <motion.p
                  className="text-xl text-white mt-2"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  {"Step into a world where tradition meets innovation "}
                </motion.p>
                <motion.button
                  className="mt-6 px-6 py-3 border border-white
                           text-white bg-transparent rounded-md hover:bg-white hover:text-black 
                            transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  onClick={shopNowHandler}
                >
                  Shop Now
                </motion.button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Desktop View */}
      <div className="hidden xl:block">
        <Slider {...settings}>
          {webSlides.map((img, idx) => (
            <div key={`web-${idx}`}>
              <img
                src={img}
                alt={`web-banner-${idx}`}
                className="w-full h-[80vh] object-cover"
              />
              <div className="absolute left-17 top-24 ">
                <motion.h1
                  className="text-5xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Welcome to <br /> AL NIBRAS Watches
                </motion.h1>
                <motion.p
                  className="text-xl text-white mt-2"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  {"Step into a world where tradition meets innovation "}
                </motion.p>
                <motion.button
                  className="mt-6 px-6 py-3 border border-white text-white bg-transparent rounded-md
                           hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  onClick={shopNowHandler}
                >
                  Shop Now
                </motion.button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BannerSlider;
