import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'

const MobileFilter = ({ open, handleFilter, filtBrandList, setFiltBrandList }) => {
    return (
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className='absolute left-0 top-full w-full z-30 bg-[#00473E]'
          >
            <Sidebar 
              filtBrandList={filtBrandList} 
              setFiltBrandList={setFiltBrandList}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

export default MobileFilter