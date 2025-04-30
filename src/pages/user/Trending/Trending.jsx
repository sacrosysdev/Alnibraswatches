import React,{useState} from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import ProductListing from './ProductListing'

const Trending = () => {
    const [filtBrandList, setFiltBrandList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
      };
    const handleRemoveBrand = (brandName) => {
        setFiltBrandList((prev) =>
          prev.filter((brand) => brand.Name !== brandName)
        );
    };
    const handlePriceCategory = (price) =>{
        console.log(price);
    }
    
  return (
    <div className='px-5 xl:px-16 py-5 bg-[#F1F1F1]'>
        <div className='grid grid-cols-1 xl:grid-cols-4 gap-5'>
            <div className='hidden  xl:flex xl:col-span-1'>
                <Sidebar setFiltBrandList={setFiltBrandList} 
                         filtBrandList={filtBrandList}
                         onSelectCategory={handleSelectCategory}
                         onSelectPrice={handlePriceCategory}/>
            </div>
            <div className='col-span-1 xl:col-span-3'>
                <div>
                    <Header 
                            selectedBrands={filtBrandList} 
                            onRemoveBrand={handleRemoveBrand}/>
                    <ProductListing/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Trending