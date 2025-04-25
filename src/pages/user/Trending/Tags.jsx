import React from 'react'
import { IoClose } from "react-icons/io5";

const Tags = ({tag,onRemove}) => {
  
  return (
    <div>
        <div className='flex gap-2 items-center bg-[#F7F6F2] px-3 py-1 rounded-2xl'>
            <h1 className='text-sm font-gilroy'>{tag}</h1>
            <IoClose onClick={onRemove} className='cursor-pointer'/>
        </div>
    </div>
  )
}

export default Tags