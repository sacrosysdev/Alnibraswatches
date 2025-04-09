import React from 'react'
import Banner from '../../assets/images/home/offerbannerimg.png'
import Slider from 'react-slick'
import { offerSliderData } from '../../constants'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OfferBanner = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: false,
  };

  return (
    <div className="pt-5">
      <Slider {...settings} className='custom-slider'>
        {offerSliderData.map((item) => (
          <div key={item.id}>
            <div className="relative bg-black h-[503px] overflow-hidden rounded-lg w-full">
              <img
                src={Banner}
                alt="banner"
                className="h-full w-full object-cover transform xl:-translate-x-96"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-end px-10 gap-2">
                <h1 className="font-bold text-5xl text-[#DDDDDD] xl:w-1/2 text-right">
                  {item.title}
                </h1>
                <p className="text-[#DBF227] font-bold text-2xl xl:w-1/2 underline text-right">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OfferBanner;
