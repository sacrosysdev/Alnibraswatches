import React, { useState,useEffect } from 'react'

const CheckboxList = ({ items, showMore, initialItems,setFiltBrandList,selectedBrands=[] }) => {
  const [showAll, setShowAll] = useState(false)
  const [checkedItems, setCheckedItems] = useState([]);
  const visibleItems = showAll ? items : items.slice(0, initialItems)
  useEffect(() => {
    if (selectedBrands) {
      setCheckedItems(selectedBrands);
    }
  }, [JSON.stringify(selectedBrands)]);
  const handleCheckboxChange = (e, item) => {
    const isChecked = e.target.checked;
    let updatedList = isChecked
      ? [...checkedItems, item]
      : checkedItems.filter((i) => i.Name !== item.Name);

    setFiltBrandList(updatedList);
  };
  return (
    <div className="space-y-1">
      <div
        className="transition-all duration-1000 ease-in-out overflow-hidden"
        style={{ maxHeight: showAll ? '1000px' : `${initialItems * 1.5}rem` }}
      >
        {visibleItems.map((item) => (
          <div key={item.Name} className="flex items-center text-sm">
            <input
              type="checkbox"
              id={item.Name.replace(/\s+/g, '')}
              className="mr-2"
              onChange={(e) => handleCheckboxChange(e, item)}
              checked={selectedBrands.some((i) => i.Name === item.Name)} // ✅ synced
            />
            <label htmlFor={item.Name.replace(/\s+/g, '')}>{item.Name}</label>
          </div>
        ))}
      </div>
      {showMore && items.length > initialItems && (
        <div
          onClick={() => setShowAll(!showAll)}
          className="text-[#007185] text-sm cursor-pointer hover:underline"
        >
          {showAll ? 'Show Less' : 'Show All'}
        </div>
      )}
    </div>
  )
}

export default CheckboxList