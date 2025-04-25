import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const SelectOption = ({ items, showMore, initialItems, onSelect }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, initialItems);

  return (
    <div className="space-y-1">
      <div
        className={`transition-all duration-1000 ease-in-out overflow-hidden`}
        style={{
          maxHeight: showAll ? '1000px' : `${initialItems * 1.5}rem`
        }}
      >
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center cursor-pointer"
            onClick={() => onSelect?.(item)} // ✅ Call parent callback
          >
            <h1>{item.Name}</h1>
          </div>
        ))}
      </div>
      {showMore && items.length > initialItems && (
        <div
          className="flex items-center gap-1 cursor-pointer hover:underline"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? <FaAngleUp color="#555555" /> : <FaAngleDown color="#555555" />}
          <div className="text-[#007185] text-sm">
            {showAll ? 'See Less Departments' : 'See all Departments'}
          </div>
        </div>
      )}
    </div>
  );
};


export default SelectOption