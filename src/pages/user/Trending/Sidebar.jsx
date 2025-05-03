import React from 'react';
import { FaAngleDown } from "react-icons/fa6";
import SelectOption from './Filters/SelectOption';
import StarRating from './Filters/StarRating';
import CheckboxList from './Filters/CheckboxList';
import { useBrandList, useCategoryList } from '../../../api/user/hooks';

const Sidebar = ({ 
  setFiltBrandList, 
  filtBrandList,
  selectedCategories = [],
  onSelectCategory,
  onSelectPrice,
  handleClearSearch 
}) => {
  const { data: brands, isLoading: loadingBrands } = useBrandList();
  const { data: categories, isLoading: loadingCategories } = useCategoryList();
  
  const priceRanges = [
    { Id: 'price1', Name: 'Under AED 100 ', min: '0', max: '100' },
    { Id: 'price2', Name: 'AED 100 - AED 500', min: '100', max: '500' },
    { Id: 'price3', Name: 'AED 500 - AED 1000', min: '500', max: '1000' },
    { Id: 'price4', Name: 'AED 1000 - AED 2000', min: '1000', max: '2000' },
    { Id: 'price5', Name: 'Over AED 2000', min: '2000', max: '10000' }
  ];

  // Handle manual price input
  const handlePriceSubmit = (e) => {
    e.preventDefault();
    const min = e.target.elements.min.value;
    const max = e.target.elements.max.value;
    
    if (min || max) {
      onSelectPrice({ 
        min: min || '0',
        max: max || '100000'
      });
    }
  };

  return (
    <div className='px-5 py-3 bg-white flex flex-col 
                    gap-5 w-full h-[70vh] md:h-auto 
                    overflow-y-auto md:overflow-y-hidden'>
      {/* Department/Categories */}
      <div className='text-sm flex flex-col gap-2'>
        <h1 className='font-bold'>Department</h1>
        <div>
          {loadingCategories ? (
            <div className="text-sm text-gray-500">Loading categories...</div>
          ) : (
            <CheckboxList 
              items={categories || []}
              showMore={true} 
              initialItems={5}
              onSelect={onSelectCategory}
              selectedItems={selectedCategories} // Pass selected categories
            />
          )}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h1 className='font-bold text-sm pb-2'>Brand</h1>
        {loadingBrands ? (
          <div className="text-sm text-gray-500">Loading brands...</div>
        ) : (
          <CheckboxList 
            items={brands || []}
            showMore={true} 
            initialItems={5}
            setFiltBrandList={setFiltBrandList}
            selectedBrands={filtBrandList} 
          />
        )}
      </div>

      {/* Price */}
      <div className='text-sm flex flex-col gap-2'>
        <h1 className='font-bold'>Price</h1>
        <div>
          <SelectOption 
            items={priceRanges} 
            showMore={false} 
            onSelect={onSelectPrice}
          />
        </div>
        
        {/* Custom price range input */}
        <form onSubmit={handlePriceSubmit} className="flex flex-col gap-2">
          <div className="flex items-center space-x-2">
            <input 
              type="number" 
              name="min"
              placeholder="Min" 
              className="w-16 border border-[#898C8C]  rounded-md p-1 text-xs" 
              min="0"
            />
            <input 
              type="number" 
              name="max"
              placeholder="Max" 
              className="w-16 border border-[#898C8C] rounded-md p-1 text-xs" 
              min="0"
            />
            <button 
              type='submit' 
              className="bg-black text-white px-2 py-1 text-xs rounded hover:bg-black cursor-pointer"
            >
              Go
            </button>
          </div>
        </form>

        <button
             onClick={handleClearSearch}
              className="bg-[#e73333] text-white w-full p-5 py-2 mt-5 rounded-md shadow hidden lg:inline-block
                         transition cursor-pointer"
            >
              Clear 
            </button>
      </div>
    </div>
  );
};

export default Sidebar;