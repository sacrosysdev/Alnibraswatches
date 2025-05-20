import React from "react";
import Slider from "react-slick";
import { useGetAdvertisement } from "../../../api/admin/hooks";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OfferBanner = () => {
  const { data: advertisements = [] } = useGetAdvertisement();
  const navigate = useNavigate();

  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="pt-5">
      <Slider {...settings} className="custom-slider">
        {advertisements.map((item) => (
          <div key={item.productID} className="px-2">
            <div
              className="w-full h-[400px] md:h-[400px] lg:h-[400px] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleImageClick(item.productID)}
            >
              <img
                src={item.imageUrl}
                alt={item.productName}
                className="w-full h-full object-cover object-center rounded-lg"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OfferBanner;
