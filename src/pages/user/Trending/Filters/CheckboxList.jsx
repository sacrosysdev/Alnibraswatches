import React, { useState } from 'react'

const CheckboxList = ({ items, showMore, initialItems }) => {
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
        <div key={item} className="flex items-center text-sm">
          <input type="checkbox" id={item.replace(/\s+/g, '')} className="mr-2" />
          <label htmlFor={item.replace(/\s+/g, '')}>{item}</label>
        </div>
      ))}
      </div>
      {showMore && items.length > initialItems && (
        <div onClick={()=>{setShowAll(!showAll)}} className="text-[#007185] text-sm cursor-pointer hover:underline">{showAll ? "Show Less":"Show All"}</div>
      )}
    </div>
  )
}

export default CheckboxList