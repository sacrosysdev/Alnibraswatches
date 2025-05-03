import React from 'react';
import Slider from 'react-slick';
import { offerSliderData } from '../../../constants';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OfferBanner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: false,
  };
  
  return (
    <div className="pt-5">
      <Slider {...settings} className="custom-slider">
        {offerSliderData.map((item) => (
          <div key={item.id}>
            <div className="w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden flex flex-col xl:flex-row">
              {/* LEFT HALF - TEXT */}
              <div className="hidden xl:flex w-full xl:w-1/2 bg-[#003F38] text-white flex-col justify-center items-start p-10">
                <h2 className="text-3xl xl:text-5xl font-bold mb-4">Special Offer</h2>
                <p className="text-lg xl:text-xl mb-6">Grab the best deals of the season before they're gone!</p>
                {/* <button className="bg-white text-[#003F38] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                  Shop Now
                </button> */}
              </div>
              
              {/* RIGHT HALF - IMAGE */}
              <div className="w-full xl:w-1/2 h-full">
                <img
                  src={item.image}
                  alt="banner"
                  className="w-full h-full object-cover object-center rounded-lg xl:rounded-l-none xl:rounded-r-lg"
                />                
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OfferBanner;