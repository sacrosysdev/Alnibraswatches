import React, { useState } from 'react';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Tags from './Tags';
import SortIcon from '../../../assets/svg/trending/sortIcon.svg';
import MobileFilter from './MobileFilter';

const Header = ({ selectedBrands, onRemoveBrand, sorting }) => {
  const [filterMobile, setFilterMobile] = useState(false);
  const [sortBy, setSortBy] = useState(true)
  const handleFilterMobile = () => {
    setFilterMobile(!filterMobile);
  };

  return (
    <div className='relative flex flex-col gap-3'>
      <h1 className='font-bold text-2xl'>Trending</h1>

      {/* Breadcrumb */}
      <div className='flex items-center gap-1'>
        <h1 className='text-[#546D7D]'>Home</h1>
        <span><MdOutlineKeyboardArrowRight color='#546D7D' /></span>
        <h1 className='text-[#005C53]'>Trending</h1>
      </div>

      {/* Filter bar */}
      <div className='flex justify-between items-center mb-3'>
        <div className='hidden xl:flex gap-5 items-center'>
          <h1 className='text-base'>Filter By :</h1>
          <div className='flex gap-3'>
            {selectedBrands.map((item, index) => (
              <div key={index}>
                <Tags tag={item.Name} onRemove={() => onRemoveBrand(item.Name)} />
              </div>
            ))}
          </div>
        </div>

        {/* Sort option */}
        <button
          onClick={() => {
            setSortBy(!sortBy);
            sorting(!sortBy); // pass new state to parent
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          {sortBy ? "🔼 Price: Low to High" : "🔽 Price: High to Low"}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <MobileFilter
        open={filterMobile}
        handleFilter={handleFilterMobile}
        filtBrandList={selectedBrands}
        setFiltBrandList={onRemoveBrand}
      />
    </div>
  );
};

export default Header;
