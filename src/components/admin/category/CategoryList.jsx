import React from "react";
import CategoryGrid from "./CategoryGrid";
import { useGetAllCategory } from "../../../api/admin/hooks";
import DynamicTable from "../shared/DynamicTable";
import { Edit2 } from "lucide-react";

const CategoryList = ({
  gridView,
  filteredCategories,
  handleEditCategory,
  selectedCategories,
  setSelectedCategories,
}) => {
  const { isLoading, isError, refetch } = useGetAllCategory();
  const CATEGORY_COLUMNS = [
    {
      key: "Id",
      header: "ID",
    },
    {
      key: "ImageUrl",
      header: "Image",
      render: (category) => (
        <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100">
          {category.ImageUrl && category.ImageUrl !== "" ? (
            <img
              src={category.ImageUrl}
              alt={category.CategoryName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>
      ),
    },
    {
      key: "Name",
      header: "Name",
    },
    {
      key: "CategoryDescription",
      header: "Description",
    },
    {
      key: "actions",
      header: "Actions",
      render: (category) => (
        <div className="flex space-x-2 pl-4">
          <button
            onClick={() => handleEditCategory(category)}
            className="text-[#005C53] cursor-pointer hover:text-gray-400"
          >
            <Edit2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  if (gridView) {
    return (
      <div className="w-full overflow-y-auto h-full bg-white shadow-sm rounded-lg">
        <CategoryGrid
          categories={filteredCategories}
          handleEditCategory={handleEditCategory}
          refetch={refetch}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    );
  }

  return (
    <DynamicTable
      isLoading={isLoading}
      isError={isError}
      selectedItems={selectedCategories}
      setSelectedItems={setSelectedCategories}
      columns={CATEGORY_COLUMNS}
      idField="Id"
      data={filteredCategories}
      emptyMessage="No Category found"
    />
  );
};

export default CategoryList;
