import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ProductListing from './ProductListing';
import MobileFilter from './MobileFilter';
import { useFilterProducts } from '../../../api/user/hooks';
import { FaFilter } from 'react-icons/fa';
import NoDataFound from '../../../components/user/NoDataFound';
import PageSkeleton from '../../../components/user/Skelton/trendingSkelton';
const Trending = () => {
  // State management
  const [filtBrandList, setFiltBrandList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: null, max: null });
  const [productList, setProductList] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isPriceLowToHigh, setIsPriceLowToHigh] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const filterProductsMutation = useFilterProducts();

  const toggleMobileFilter = () => {
    setMobileFilterOpen(!mobileFilterOpen);
  };
  const handleSelectCategory = (category, isChecked) => {
    setSelectedCategories(prev => {
      if (isChecked) {
        return [...prev, category];
      } else {
        return prev.filter(cat => cat.Id !== category.Id);
      }
    });
    setIsFilterApplied(true);
  };

  // Handle brand removal 
  const handleRemoveBrand = (brandName) => {
    setFiltBrandList((prev) =>
      prev.filter((brand) => brand.Name !== brandName)
    );
    setIsFilterApplied(true);
  };

  // Handle category removal 
  const handleRemoveCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.filter((category) => category.Id !== categoryId)
    );
    setIsFilterApplied(true);
  };

  // Handle price range selection
  const handlePriceCategory = (price) => {
    setPriceRange({
      min: price.min || null,
      max: price.max || null
    });
    setIsFilterApplied(true);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFiltBrandList([]);
    setSelectedCategories([]);
    setPriceRange({ min: null, max: null });
    setIsFilterApplied(false);
    setMobileFilterOpen(false);
  };

  const handleSearch = () => {
    setMobileFilterOpen(false);
  };

  useEffect(() => {
    if (filtBrandList.length > 0 && !isFilterApplied) {
      setIsFilterApplied(true);
    }
  }, [filtBrandList]);

  // Fetch initial products on component mount
  useEffect(() => {
    const defaultPayload = {
      pageNumber: 1,
      pageSize: 50,
    };
    
    filterProductsMutation.mutate(defaultPayload, {
      onSuccess: (data) => {
        setProductList(data);
        setIsInitialLoading(false);
      }, 
      onError: (error) => {
        console.log(error);
        setIsInitialLoading(false);
      },
    });
  }, []);
  
  // Main filter action
  useEffect(() => {
    if (!isFilterApplied) return;
    const brandIDs = filtBrandList.map((b) => b.Id).filter(Boolean).join(',');
    const categoryIDs = selectedCategories.map((c) => c.Id).filter(Boolean).join(',');
    const payload = {
      brandIDs: brandIDs || undefined,
      categoryIDs: categoryIDs || undefined,
      minPrice: priceRange.min || undefined,
      maxPrice: priceRange.max || undefined,
      pageNumber: 1,
      pageSize: 50,
      sortByPrice: isPriceLowToHigh ? "asc" : "desc"
    };

    // Clean payload by removing undefined values
    Object.keys(payload).forEach(key =>
      payload[key] === undefined && delete payload[key]
    );

    filterProductsMutation.mutate(payload, {
      onSuccess: (data) => {
        setProductList(data);
      }, 
      onError: (error) => {
        const message = error.response?.data?.message || "Something went wrong";
        if (message === "No products found.") {
          setProductList([]);
        }
        console.log('No products found');
      },
    });
  }, [filtBrandList, selectedCategories, priceRange, isFilterApplied, isPriceLowToHigh]);

  useEffect(() => {
    if (isFilterApplied && mobileFilterOpen) {
      setMobileFilterOpen(false);
    }
  }, [isFilterApplied]);

  // Count active filters for mobile badge
  const activeFilterCount = filtBrandList.length + selectedCategories.length + (priceRange.min || priceRange.max ? 1 : 0);
  
  const sortingHandler = (sortState) => {
    setIsPriceLowToHigh(sortState);
    setIsFilterApplied(true);
  };

  // Show complete page skeleton on initial load
  if (isInitialLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="px-4 xl:px-16 py-5 bg-[#F1F1F1]">
      {/* Mobile Filter Toggle Button */}
      {!mobileFilterOpen && (
        <div className="xl:hidden">
          <button
            onClick={toggleMobileFilter}
            className="fixed bottom-5 right-5 z-[40] bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          >
            <FaFilter size={20} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Mobile Filter Panel */}
      <MobileFilter
        open={mobileFilterOpen}
        handleFilter={toggleMobileFilter}
        filtBrandList={filtBrandList}
        setFiltBrandList={setFiltBrandList}
        selectedCategories={selectedCategories}
        onSelectCategory={handleSelectCategory}
        onSelectPrice={handlePriceCategory}
        handleClearSearch={handleResetFilters}
        handleSearch={handleSearch}
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        {/* Desktop Sidebar */}
        <div className="hidden xl:flex xl:col-span-1">
          <Sidebar
            setFiltBrandList={setFiltBrandList}
            filtBrandList={filtBrandList}
            selectedCategories={selectedCategories}
            onSelectCategory={handleSelectCategory}
            onSelectPrice={handlePriceCategory}
            handleClearSearch={handleResetFilters}
          />
        </div>

        {/* Product section */}
        <div className="col-span-1 xl:col-span-3">
          <Header
            selectedBrands={filtBrandList}
            selectedCategories={selectedCategories}
            onRemoveBrand={handleRemoveBrand}
            onRemoveCategory={handleRemoveCategory}
            onResetFilters={handleResetFilters}
            isFilterApplied={isFilterApplied}
            sorting={sortingHandler}
          />

          {!filterProductsMutation.isLoading && productList?.length === 0 && (
            <div className="col-span-full">
              <NoDataFound />
            </div>
          )}

          <ProductListing
            products={isFilterApplied ? productList : null}
            isLoading={filterProductsMutation.isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Trending;