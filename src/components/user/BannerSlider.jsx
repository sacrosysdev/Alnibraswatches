import React from 'react'
import Slider from 'react-slick'
import Banner from '../../pages/user/Home/Banner'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderData } from '../../constants';
import { motion, AnimatePresence } from 'framer-motion';

const BannerSlider = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover:false,
        autoplay:true,
        autoplaySpeed:5000,
        fade:true
      };
      return (
        <div className=''>
            <AnimatePresence>
            <Slider {...settings} >
            <div>
                <Banner/>
            </div>
            {sliderData.map((item)=>(<div key={item.id}>
                    <div className='relative h-[110vh] md:h-[70vh] xl:min-h-[130vh] overflow-hidden'>
                        <img src={item.img} alt="bannerimg" className='object-cover h-full w-full'/>
                        <div className='absolute left-2 xl:left-16 top-5 xl:top-16 w-full'>
                        <motion.h1
                            key={item.id + '-title'}
                            className='md:w-1/2 font-unlock text-3xl xl:text-[60px] xl:leading-16 text-white'
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            >
                            {item.title}
                            </motion.h1>

                            <motion.p
                            key={item.id + '-desc'}
                            className='w-11/12 md:w-1/3 pt-5 font-extralight leading-5 text-white'
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            >
                            {item.desc}
                            </motion.p>
                        </div>
                    </div>
                </div>))}
            </Slider>
            </AnimatePresence>
        </div>
        
      );
    }
export default BannerSlider