import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const SelectOption = ({ items, showMore, initialItems }) => {
    const [showAll, setShowAll] = useState(false)
    const visibleItems = showAll ? items : items.slice(0, initialItems)
  return (
    <div className="space-y-1">
            <div
                className={`transition-all duration-1000 ease-in-out overflow-hidden`}
                style={{ 
                    maxHeight: showAll ? '1000px' : `${initialItems * 1.5}rem` 
                }}
            >     
                   {visibleItems.map((item) => (
                <div key={item} className="flex items-center">
                <h1>{item}</h1>
                </div>
            ))}
        </div>

          {showMore && items.length > initialItems && (
            <div className='flex items-center gap-1' onClick={()=>{setShowAll(!showAll)}}>
              {showAll ? (<FaAngleUp color='#555555'/>) : (<FaAngleDown color='#555555'/>)}
              <div className="text-[#007185] text-sm cursor-pointer hover:underline">{showAll ? "See Less Departments":"See all Departments"}</div>
            </div>
            
          )}
        </div>
  )
}

export default SelectOption