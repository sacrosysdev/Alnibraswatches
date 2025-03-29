import React from 'react'
import Call from '../assets/svg/topnav/call.svg'
import Mail from '../assets/svg/topnav/mail.svg'

const TopNav = () => {
  return (
    <div className='bg-[#003F38] flex md:justify-between md:items-center py-2 w-full xl:px-14'>
        <div className='flex justify-between md:flex-row md:items-center gap-5'>
            <div className='flex items-center gap-2'>
                <div>
                    <img src={Call} alt="callicon" />
                </div>
                <h1 className='text-[#F0F0D6] text-sm'>1800 257 8600</h1>
            </div>
            <div className='flex items-center  gap-2 '>
                <div>
                    <img src={Mail} alt="mailicon" />
                </div>
                <h1 className='text-[#F0F0D6] text-sm'>info@goldDiomonds.com</h1>
            </div>
        </div>
        <div className='hidden md:flex'>
            <h1 className='text-[#F0F0D6] text-sm'>IST  (Mon - Sat) 10:00 AM to 6:00 PM</h1>
        </div>
    </div>
  )
}

export default TopNav