import React from 'react'
import googleplay from '../../assets/images/home/googleplay.png'
import appstore from '../../assets/images/home/appstore.png'

const AppDownload = () => {
  return (
    <div className='bg-[#52908A] border border-[#00211E] rounded-2xl'>
        <div className='flex flex-col gap-5 justify-center items-center text-center  mx-auto py-5 xl:py-20 '>
        <h1 className='text-3xl xl:text-5xl font-semibold font-poppins text-[#F1F1F1] w-2/3'>Download Our Mobile App</h1>
        <p className='text-[#A5B2BA] xl:w-1/2'>Get the top E-commerce app on your phone! We’ve got you covered with a super user-friendly experience and tons of events to check out. Dive in and explore!</p>
        <div className='flex flex-col xl:flex-row gap-3 items-center'>
            <div className='h-20 w-40'>
                <img src={googleplay} alt="googleplaybutton"  className='h-full w-full object-contain'/>
            </div>
            <div className='h-20 w-40'>
                <img src={appstore} alt="appstorebutton" className='h-full w-full object-contain'/>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AppDownload