import React from 'react'
import { sidebarData } from '../../constants'
import { IoIosArrowDown } from "react-icons/io";

const Sidebar = () => {
  return (
    <div className='px-5 bg-[#A3C4C13D]'>
        <div className='py-3'>
            <h1 className='font-bold text-2xl'>Filters</h1>
        </div>
        <hr className=''/>
        <div className='py-3'>
            {sidebarData.map((item, index)=>(<div className='flex justify-between items-center py-2' key={index}>
                <h1 className='font-medium text-xl'>{item.title}</h1>
                <IoIosArrowDown size={20}/>
            </div>))}
        </div>
    </div>
  )
}

export default Sidebar