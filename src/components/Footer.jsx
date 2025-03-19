import React from 'react'
import Logo from '../assets/images/navbar/alnibraslogo.png'
import { footerData } from '../constants'

const Footer = () => {
  return (
    <div className='bg-[#A3C4C1] '>
      <div className='grid grid-cols-11 gap-5 p-20'>
        <div className='col-span-2'>
          <img src={Logo} alt="" className='object-contain'/>
        </div>
        {footerData.map((item, index)=>(<div key={index} className='col-span-2 '>
          <h1 className='font-medium text-xl'>{item.title}</h1>
          <ul className='pt-5 flex flex-col gap-4 '>
           {item.subtitles.map((el, index)=>(<li className='' key={index}>
            <div className='flex gap-1 items-center '>
            {el.icon && <div className=''>
              <img src={el.icon} alt="icon" />
            </div>}
            <h1>{el.name}</h1>
            </div>
           </li>))}
          </ul>
        </div>))}
        
        <div className='col-span-3'>
        <h1 className='font-medium text-xl text-end'>Questions? Comments? Concerns?</h1>
          <div className='pt-5 flex justify-end'>
            <button  className='bg-[#003F38] rounded-lg px-5 py-2 text-white'>Help</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer