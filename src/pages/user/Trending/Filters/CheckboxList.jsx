import React, { useState, useEffect } from 'react';

const CheckboxList = ({ 
  items = [], 
  showMore = false, 
  initialItems = 5,
  setFiltBrandList, // For brand list
  onSelect, // For category selection
  selectedBrands = [],
  selectedItems = [] // Generic selected items array
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, initialItems);
  
  // Use either the specific selection list or the generic one
  const selectedList = selectedBrands.length > 0 ? selectedBrands : selectedItems;

  // Handle checkbox change
  const handleCheckboxChange = (e, item) => {
    const isChecked = e.target.checked;
    
    if (onSelect) {
      // For categories or other single selections
      onSelect(item, isChecked);
    } else if (setFiltBrandList) {
      // For brand multi-selection
      const updatedList = isChecked
        ? [...selectedList, item]
        : selectedList.filter((i) => i.Id !== item.Id && i.Name !== item.Name);
      
      setFiltBrandList(updatedList);
    
    }
  };


  if (!items || items.length === 0) {
    return <div className="text-sm text-gray-500">No items available</div>;
  }

  return (
    <div className="space-y-1">
      <div
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{ maxHeight: showAll ? '1000px' : `${initialItems * 1.5}rem` }}
      >
        {visibleItems.map((item) => (
          <div key={item.Id || item.Name} className="flex items-center text-sm">
            <input
              type="checkbox"
              id={`checkbox-${item.Id || item.Name.replace(/\s+/g, '')}`}
              className="mr-2"
              onChange={(e) => handleCheckboxChange(e, item)}
              checked={selectedList.some((i) => i.Id === item.Id || i.Name === item.Name)}
            />
            <label 
              htmlFor={`checkbox-${item.Id || item.Name.replace(/\s+/g, '')}`}
              className="cursor-pointer"
            >
              {item.Name}
            </label>
          </div>
        ))}
      </div>
      {showMore && items.length > initialItems && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[#007185] text-sm cursor-pointer hover:underline"
          aria-expanded={showAll}
        >
          {showAll ? 'Show Less' : 'Show All'}
        </button>
      )}
    </div>
  );
};

export default CheckboxList;