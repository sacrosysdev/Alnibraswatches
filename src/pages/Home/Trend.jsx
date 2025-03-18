import React from 'react'
import Blob1 from '../../assets/blobs/blobs1.svg'
import Trend1 from '../../assets/images/home/trendImg1.png'

const Trend = () => {
  return (
    <div className=''>
        <div>
        <h1 className='font-bodoni  text-[#00211E] font-bold text-[34px]'>Shop on Trend</h1>
        <p className='text-[#005C53]'>We have every style at your affordable budget</p>
        </div>
        <div className='bg-white flex gap-5 px-10 py-5 mt-16 justify-between '>
            <div className='relative border rounded-2xl overflow-hidden py-5  w-full '>
                <div className='absolute left-0 top-0'>
                    <img src={Blob1} alt="" />
                </div>
                <div className='absolute flex flex-col  items-center inset-0'>
                    <h1>Huawei 8133</h1>
                    <div>
                        <img src={Trend1} alt="" />
                    </div>
                </div>
            </div>
            <div className='relative border rounded-2xl overflow-hidden py-5  w-full '>
                <div className='absolute left-0 top-0'>
                    <img src={Blob1} alt="" />
                </div>
                <div className='absolute flex flex-col  items-center inset-0'>
                    <h1>Huawei 8133</h1>
                    <div>
                        <img src={Trend1} alt="" />
                    </div>
                </div>
            </div>
            <div className='relative border rounded-2xl overflow-hidden py-5 h-full w-full'>
                <div className='absolute left-0 top-0'>
                    <img src={Blob1} alt="" />
                </div>
                <div className='absolute flex flex-col  items-center inset-0'>
                    <h1>HUAWEI Watch 3 Pro
                    </h1>
                    <div>
                        <img src={Trend1} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Trend