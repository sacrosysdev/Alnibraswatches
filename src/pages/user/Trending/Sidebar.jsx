import React from 'react'
import { FaAngleDown } from "react-icons/fa6";
import SelectOption from './Filters/SelectOption';
import StarRating from './Filters/StarRating';
import CheckboxList from './Filters/CheckboxList';
import { useBrandList, useCategoryList } from '../../../api/user/hooks';

const Sidebar = ({ setFiltBrandList, filtBrandList,onSelectCategory,onSelectPrice }) => {
  const { data: brands, isLoading: loadingBrands } = useBrandList();
  const { data: categories, isLoading: loadingCategories } = useCategoryList()
  const priceRanges = [
    { Name: 'Under ₹1000', id: "1000" },
    { Name: '₹1000 - ₹5000', id: "1000-5000" },
    { Name: '₹5000 - ₹10000', id: "5000-10000" },
    { Name: '₹10000 - ₹20000', id: "10000-20000" },
    { Name: 'Over ₹20000', id: "20000" }
  ];

  return (
    <div className='px-5 py-3 bg-white flex flex-col 
                    gap-5 w-full h-[70vh] md:h-auto 
                    overflow-y-auto md:overflow-y-hidden '>
      <div className='text-sm flex flex-col gap-2'>
        <h1 className='font-bold '>Department</h1>
        <div>
          <SelectOption items={categories?.length > 0 ? categories : []} 
                        showMore={true} 
                        onSelect={onSelectCategory}
                        initialItems={2} />
        </div>
      </div>
      <div>
        <h1 className='font-bold text-sm pb-2'>Customer Review</h1>
        <div className="space-y-1">
          {[4, 3, 2, 1].map((rating) => (
            <StarRating key={rating} rating={rating} />
          ))}
        </div>
      </div>
      <div>
        <h1 className='font-bold text-sm pb-2'>Brand</h1>
        <CheckboxList items={brands?.length > 0 ? brands : []}
          showMore={true} initialItems={5}
          setFiltBrandList={setFiltBrandList}
          selectedBrands={filtBrandList} />
      </div>
     <div className='text-sm flex flex-col gap-2'>
        <h1 className='font-bold '>Price</h1>
        <div>
          <SelectOption items={priceRanges} showMore={false} onSelect={onSelectPrice}/>
        </div>
        <div className='flex items-center gap-1'>
          <FaAngleDown color='#555555' />
          <div className="text-[#007185] text-sm cursor-pointer hover:underline">Label 2</div>
        </div>
        <div className="flex items-center space-x-2">
          <input type="text" placeholder="₹Min" className="w-16 border border-[#898C8C] rounded-md p-1 text-xs" />
          <input type="text" placeholder="₹Max" className="w-16 border border-[#898C8C] rounded-md p-1 text-xs" />
          <button type='submit' className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded">Go</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar