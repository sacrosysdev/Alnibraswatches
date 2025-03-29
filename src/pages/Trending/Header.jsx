import React, { useState } from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Tags from './Tags';
import SortIcon from   '../../assets/svg/trending/sortIcon.svg'
import { VscSettings } from "react-icons/vsc";
import MobileFilter from './MobileFilter';

const Header = () => {
    const tags = [
        "G-Shock","Fastrack"
    ]
    const [filterMobile, setFilterMobile] = useState(false)
    const handleFilterMobile =()=>{
        setFilterMobile(!filterMobile)
    }
  return (
    <div className='relative flex flex-col gap-3'>
        <h1 className='font-bold text-2xl'>Trending</h1>
        <div className='flex items-center gap-1'>
            <h1 className='text-[#546D7D]'>Home</h1>
            <span><MdOutlineKeyboardArrowRight color='#546D7D'/></span>
            <h1 className='text-[#005C53]'>Trending</h1>
        </div>
        <div className='flex justify-between items-center'>
            <div className='hidden xl:flex gap-5 items-center'>
                <h1 className='text-base'>Filter By : </h1>
                <div className='flex gap-3'>
                    {tags.map((item, index)=>(<div key={index}>
                        <Tags tag={item}/>
                    </div>))}
                </div>
            </div>
            <div className='flex xl:hidden gap-2 items-center' onClick={handleFilterMobile}>
                <h1 className='text-base'>Filter</h1>
                <VscSettings />
            </div>
            <div className='flex items-center gap-3'>
                <h1>Sort by : </h1>
                <div className='flex gap-3 items-center'>
                    <h1 className='text-base font-normal'>Low to High</h1>
                    <div>
                        <img src={SortIcon} alt="icon" />
                    </div>
                </div>
            </div>
        </div>
        <MobileFilter open={filterMobile} handleFilter={handleFilterMobile}/>
    </div>
  )
}

export default Header