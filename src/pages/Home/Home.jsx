import React from 'react'
import Banner from './Banner'
import Trend from './Trend'
import Brands from './Brands'
import DemandItems from './DemandItems'
import OfferBanner from './OfferBanner'
import RecentSearched from './RecentSearched'
import AppDownload from './AppDownload'

const Home = () => {
  return (
    <div>
      <Banner/>
      <div className='p-5 md:p-16 flex flex-col gap-10 bg-[#F1F1F1]'>
        <Trend/>
        <Brands/>
        <DemandItems/>
        <OfferBanner/>
        <RecentSearched/>
        <AppDownload/>
      </div>
    </div>
  )
}

export default Home