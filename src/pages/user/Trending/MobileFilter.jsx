import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';

const MobileFilter = ({
  open,
  handleFilter,
  filtBrandList,
  setFiltBrandList,
  selectedCategories,
  onSelectCategory,
  onSelectPrice,
  handleClearSearch,
  handleSearch
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className='fixed left-0 top-0 w-full h-full  z-[100] bg-white'
        >
          <div className="flex items-center justify-between p-4 border-b top-100">
            <h2 className="text-lg font-medium">Filters</h2>
            <button
              onClick={handleFilter}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="h-[calc(100%-60px)] overflow-y-auto">
            <Sidebar
              filtBrandList={filtBrandList}
              setFiltBrandList={setFiltBrandList}
              selectedCategories={selectedCategories}
              onSelectCategory={onSelectCategory}
              onSelectPrice={onSelectPrice}
            />
            <div className='p-3 flex'>
              
            <button
             onClick={handleSearch}
              className="bg-[#005C53] text-white w-full p-5 py-2 mt-5 mr-3 rounded-md shadow
                         hover:bg-green-700 transition cursor-pointer"
            >
              Search
            </button>
            <button
             onClick={handleClearSearch}
              className="bg-[#e73333] text-white w-full p-5 py-2 mt-5 rounded-md shadow cursor-pointer
                         transition"
            >
              Clear 
            </button>

            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileFilter;