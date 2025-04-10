import React from 'react'
import Blob1 from '../../../assets/blobs/blobs1.svg'
import Blob2 from '../../../assets/blobs/blobs2.svg'
import Blob3 from '../../../assets/blobs/blobs3.svg'
import Trend1 from '../../../assets/images/home/trendImg1.png'
import Esim from '../../../assets/svg/home/esim.svg'
import Health from '../../../assets/svg/home/health.svg'
import Battery from '../../../assets/svg/home/battery.svg'
import Product2 from '../../../assets/images/home/product2.png'
import Product3 from '../../../assets/images/home/product3.png'
import Challenge from '../../../assets/svg/home/challenges.svg'
import Music from '../../../assets/svg/home/music.svg'
import Application from '../../../assets/svg/home/app.svg'


const Trend = () => {
    const productDetails = [
        {
            logo: Esim,
            desc: "eSIM Cellular Calling"
        },
        {
            logo: Health,
            desc: "All-day Health Management"
        },
        {
            logo: Battery,
            desc: "5-Day Battery Life"
        },
    ]
    const features = [
        {
            title: "Challenges",
            logo: Challenge
        },
        {
            title: "Music",
            logo: Music
        },
        {
            title: "Applications",
            logo: Application
        },
    ]

    return (
        <div className=''>
            <div>
                <h1 className='font-bodoni  text-[#00211E] font-bold text-[34px]'>Shop on Trend</h1>
                <p className='text-[#005C53]'>We have every style at your affordable budget</p>
            </div>
            <div className='bg-white grid grid-cols-1 xl:grid-cols-3 gap-8 p-5 xl:p-10  mt-16  items-center'>
                <div className='relative  shadow-2xl rounded-2xl overflow-hidden py-5 w-full h-[428px] hover:scale-110 transition-all  duration-300 ease-in-out cursor-pointer'>
                    <div className='absolute left-0 top-0'>
                        <img src={Blob1} alt="" className='object-contain w-full h-full' />
                    </div>
                    <div className='relative'>
                        <div className=' flex flex-col gap-5 items-center inset-0 '>
                            <h1 className='font-medium text-xl'>HUAWEI Watch 3 Pro</h1>
                            <div>
                                <img src={Trend1} alt="" className='h-full w-full object-contain'/>
                            </div>
                        </div>
                        <div className='flex flex-col pt-5 px-5'>
                            {productDetails.map((item, index) => (<div key={index} className='flex gap-2 items-center justify-start'>
                                <div>
                                    <img src={item.logo} alt="logo" />
                                </div>
                                <h1 className='text-base'>{item.desc}
                                </h1>
                            </div>))}
                        </div>
                    </div>
                </div>
                <div className='relative  shadow-2xl rounded-2xl overflow-hidden py-5 w-full h-[428px] hover:scale-110 transition-all  duration-300 ease-in-out cursor-pointer'>
                    <div className='absolute left-0 top-0'>
                        <img src={Blob2} alt="object-contain w-full h-full" />
                    </div>
                    <div className='relative'>
                        <div className=' flex flex-col gap-5 items-center inset-0 '>
                            <h1 className='font-medium text-xl'>HUAWEI Watch 3 Pro</h1>
                            <div>
                                <img src={Product2} alt="product" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative  shadow-2xl rounded-2xl overflow-hidden py-5 w-full h-[428px] hover:scale-110 transition-all  duration-300 ease-in-out cursor-pointer'>
                    <div className='absolute bottom-0 right-0'>
                        <img src={Blob3} alt="blob" />
                    </div>
                    <div className=''>
                        <div className=' flex flex-col gap-5 items-center inset-0'>
                            <h1 className='font-medium text-xl'>HUAWEI Watch 3 Pro</h1>
                            <div className=' flex items-center justify-center '>
                                <div className='absolute left-2 md:left-8 top-1/2 -translate-y-1/2'>
                                    <div className=' flex flex-col gap-5 items-start justify-center w-full'>
                                        {features.map((el, index) => (<div key={index} className='flex items-center '>
                                            <div className='bg-[#005C53] p-2 rounded-lg'>
                                                <img src={el.logo} alt="logo" className='h-6 w-6 object-cover' />
                                            </div>
                                            <div className='bg-[#E1E1E1]  py-1 px-5 '>
                                                <h1>{el.title}</h1>
                                            </div>
                                        </div>))}
                                    </div>
                                </div>
                                <div className='absolute right-2 md:right-8 top-1/2 -translate-y-1/2'>
                                   <div className=''>
                                        <img src={Product3} alt="product" className='object-contain h-full w-full' />
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trend