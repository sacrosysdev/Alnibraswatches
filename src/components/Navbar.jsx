import React from 'react'
import Logo from '../assets/images/navbar/alnibraslogo.png'
import Searchbox from './Searchbox'
import { navIcons } from '../constants'

const Navbar = () => {
  return (
    <div className='grid grid-cols-4 items-center w-full bg-[#005C53] px-16 h-[128px]'>
      <div className='col-span-1 justify-start'>
        <div className='justify-start'>
          <img src={Logo} alt="logo" className='object-contain'/>
        </div> 
      </div>
      <div className='col-span-3'>
        <div className='flex justify-end'>
          <div className='flex gap-5 items-center justify-end w-4/5'>
          <div className='w-1/2'>
            <Searchbox/>
          </div>
          <div className='flex gap-3'>
            {navIcons.map((item, index)=>(<div key={index}>
              <img src={item.icon} alt="icon" />
            </div>))}
          </div>
          
          </div>
        </div>
        <div className='flex justify-start'>links</div>
      </div>
    </div>
  )
}

export default Navbar