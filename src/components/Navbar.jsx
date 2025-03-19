import React from 'react'
import Logo from '../assets/images/navbar/alnibraslogo.png'
import Searchbox from './Searchbox'
import { navIcons, navlinks } from '../constants'

const Navbar = () => {
  return (
    <div className='grid grid-cols-4 items-center w-full bg-[#005C53] px-16 h-[128px] z-50'>
      <div className='col-span-1 justify-start'>
        <div className='justify-start'>
          <img src={Logo} alt="logo" className='object-contain' />
        </div>
      </div>
      <div className='col-span-3'>
        <div className='flex justify-end'>
          <div className='flex gap-5 items-center justify-end w-4/5'>
            <div className='w-1/2'>
              <Searchbox />
            </div>
            <div className='flex gap-3'>
              {navIcons.map((item, index) => (<div key={index}>
                <img src={item.icon} alt="icon" />
              </div>))}
            </div>

          </div>
        </div>
        <div className='flex justify-start items-end pt-8 pl-10 text-[#F0F0D6]'>
          <div className='flex gap-3 '>
            {navlinks.map((item, index) => (
              <div key={index} className='relative uppercase group'>
                <h1 className=' text-lg transition-transform duration-200 ease-in-out cursor-pointer group-hover:-translate-y-3'>
                  {item}
                </h1>
                <hr className='absolute text-[#F0F0D6] left-0 w-full opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100 pointer-events-none' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar