import React from 'react'
import Trend from './Trend'
import Brands from './Brands'
import DemandItems from './DemandItems'
import OfferBanner from './OfferBanner'
import RecentSearched from './RecentSearched'
// import AppDownload from './AppDownload'
import BannerSlider from '../../../components/user/BannerSlider'

const Home = () => {
  return (
    <div className='bg-[#F1F1F1] overflow-x-hidden'>
      {/* <Banner/> */}
      <BannerSlider/>
      <div className='p-2 md:p-12 flex flex-col gap-5 md:gap-10 bg-[#F1F1F1]'>
        <Trend/>
        <Brands/>
        <DemandItems/>
        <OfferBanner/>
        <RecentSearched/>
        {/* <AppDownload/> */}
      </div>
    </div>
  )
}

export default Home