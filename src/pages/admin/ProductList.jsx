import React, { useEffect, useState } from "react";
import PageHeader from "../../components/admin/shared/PageHeader";
import { Edit2, PlusCircle, Trash2 } from "lucide-react";
import {
  useAddProducts,
  useEditProduct,
  useGetAllCategory,
  useGetBrand,
  useGetColor,
  useGetProducts,
  useGetSizes,
} from "../../api/admin/hooks";
import DynamicTable from "../../components/admin/shared/DynamicTable";
import { BiBadge } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import ProductModal from "../../components/admin/products/ProductModal";
import DeleteModal from "../../components/admin/shared/DeleteModal";
import { INITIAL_PRODUCT_DETAILS } from "../../constant/admin";

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [sortedProducts, setSortedProducts] = useState(null);

  const { data: products, refetch, isLoading, isError } = useGetProducts();
  const { data: sizes, isLoading: sizeLoading } = useGetSizes();
  const { data: categories, isLoading: categoryLoading } = useGetAllCategory();
  const { data: colors, isLoading: colorLoading } = useGetColor();
  const { data: brands, isLoading: brandLoading } = useGetBrand();

  //mutations
  const addProduct = useAddProducts();
  const editProduct = useEditProduct();

  // Form data structure for product creation/editing
  const [formData, setFormData] = useState(INITIAL_PRODUCT_DETAILS);
  // Mock data for demo purposes - in real app these would come from API
  const [product, setProducts] = useState([]);

  const PRODUCT_COLUMNS = [
    {
      key: "images",
      className: "w-10",
      header: "Image",
      render: (products) => {
        const images = products.images;
        return (
          <div className="relative h-12 w-20 overflow-visible">
            {images?.length > 0 ? (
              <div className="flex relative">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="absolute h-12 w-12 rounded-md overflow-hidden
                    cursor-pointer bg-gray-100 transition-all duration-300 ease-in-out"
                    style={{
                      left: `${index * 25}px`,
                      zIndex: index,
                      transform: `translateZ(0)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "scale(1.8) translateZ(0)";
                      e.currentTarget.style.zIndex = "20";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateZ(0)";
                      e.currentTarget.style.zIndex = index.toString();
                    }}
                  >
                    <img
                      src={img?.ImageUrl || img?.imageUrl}
                      alt={`${products.CategoryName || "Product"} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-12 w-12 rounded-md flex items-center justify-center text-xs text-gray-400 bg-gray-100">
                No image
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "productName",
      className: "w-40",
      header: "Name",
      render: (product) => {
        // Truncate product name if it's too long
        const truncatedName =
          product.productName.length > 60
            ? product.productName.substring(0, 60) + "..."
            : product.productName;

        return (
          <div className="flex flex-col">
            {/* Product Name */}
            <div className="text-sm font-medium truncate hover:text-blue-600 transition-colors cursor-pointer">
              {truncatedName}
            </div>
            <div className="flex items-center gap-x-4">
              {/* Brand with Icon */}
              {product.brandName && (
                <div className="flex gap-x-1 items-center mt-1 text-xs text-gray-500">
                  <BiBadge />
                  {product.brandName}
                </div>
              )}
              {/* Category  */}
              {product.categoryName && (
                <div className="flex gap-x-1 items-center mt-1 text-xs text-gray-500">
                  <MdCategory />
                  {product.categoryName}
                </div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      key: "stockQty",
      className: "w-40",
      header: "Qauntity",
    },
    {
      key: "price",
      header: "Prize",
      className: "w-40",
      render: (product) => (
        <span
          className={`${
            product.price ? `text-gray-800` : `text-gray-400 font-normal`
          }`}
        >
          {product.price ? product.price : "NA"}
        </span>
      ),
    },
    {
      key: "variants",
      header: "Variants",

      render: (products) => (
        <span
          className={`${
            products.variants?.length
              ? `text-gray-800`
              : `text-gray-400 font-normal`
          }`}
        >
          {products?.variants?.length || "NA"}
        </span>
      ),
    },
    {
      key: "taxCode",
      header: "TaxCode",
      className: "w-40",
      render: (product) => (
        <span
          className={`${
            product.taxCode !== ""
              ? `text-gray-600 font-mono font-semibold `
              : `text-gray-400 font-normal`
          }`}
        >
          {product.taxCode !== "" ? product.taxCode : "NA"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (product) => (
        <div className="flex space-x-2 pl-4">
          <button
            onClick={() => handleEditProduct(product)}
            className="text-[#005C53] cursor-pointer hover:text-gray-400"
          >
            <Edit2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (products) {
      const filterd = products.map((product) => {
        const isVariantHas = product.variants.length > 0;
        const firstVariant = product.variants[0];
        if (isVariantHas) {
          return {
            ...product,
            price: firstVariant.price.price,
            stockQty: firstVariant.stock.onhand,
            images: firstVariant.images,
            discountPrice: firstVariant.price.discountPrice,
          };
        } else {
          return product;
        }
      });
      setSortedProducts(filterd);
    }
  }, [products]);
  // Open modal for adding new product
  const handleAddProduct = () => {
    setIsEditing(false);
    setCurrentProduct(null);
    setFormData(INITIAL_PRODUCT_DETAILS);
    setIsModalOpen(true);
  };
  // Open modal for editing product
  const handleEditProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setFormData({
      productName: product.productName,
      description: product.description,
      categoryId: product.categoryId,
      taxCode: product.taxCode,
      images: product.images || [],
      brandID: product.brandID,
      price: product.price,
      stockQty: product.stockQty,
      discountPrice: product.discountPrice,
      variants: product.variants || [],
    });
    setIsModalOpen(true);
  }; // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Update handleSubmit function to better handle loading state
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && currentProduct) {
        // For editing a product
        await editProduct.mutateAsync({
          updatedProduct: formData,
          productId: currentProduct.productId,
        });
      } else {
        // For adding a new product
        const newProduct = {
          ...formData,
        };
        if (newProduct.variants.length !== 0) {
          delete newProduct.enableVariant;
          delete newProduct.price;
          delete newProduct.discountPrice;
          delete newProduct.stockQty;
        }
        await addProduct.mutateAsync(newProduct);
      }

      // Refetch products after successful operation
      refetch();
      // Close modal only after operation completes
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
      // Consider showing error message to the user here
    }
  };

  // Delete selected products
  const handleDeleteSelected = async () => {
    try {
      // Reset any previous error
      setDeleteError(null);

      // Filter out the selected products
      const updatedProducts = products.filter(
        (product) => !selectedProducts.includes(product.id)
      );

      setProducts(updatedProducts);
      setSelectedProducts([]);
      setIsDeleteModalVisible(false);
    } catch (error) {
      setDeleteError(error);
    }
  };

  // Reset error when closing the delete modal
  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setDeleteError(null);
  };

  const filteredProducts = sortedProducts
    ? sortedProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="w-full h-full overflow-hidden gap-y-4  flex flex-col p-5">
      <PageHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder="Search here by size lable"
        viewToggle={null}
        actionButton={{
          label: "Add Product",
          onClick: handleAddProduct,
          icon: <PlusCircle size={16} />,
        }}
      />
      <DynamicTable
        isLoading={
          isLoading ||
          categoryLoading ||
          brandLoading ||
          colorLoading ||
          sizeLoading
        }
        isError={isError}
        columns={PRODUCT_COLUMNS}
        selectedItems={selectedProducts}
        setSelectedItems={setSelectedProducts}
        idField="productId"
        data={filteredProducts}
        emptyMessage="No size found"
      />
      <ProductModal
        isLoading={addProduct.isPending || editProduct.isPending}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        isEditing={isEditing}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        brands={brands}
        colors={colors}
        sizes={sizes}
      />
      {/* Delete Confirmation Modal - appears at the bottom right */}
      <DeleteModal
        isVisible={isDeleteModalVisible}
        selected={selectedProducts}
        setVisible={handleCloseDeleteModal}
        isOpen={selectedProducts.length > 0}
        handleDelete={handleDeleteSelected}
        title={"Delete Brands"}
        isError={!!deleteError}
        error={deleteError}
      />

      {/* Floating Action Button to trigger delete modal */}
      {selectedProducts.length > 0 && (
        <button
          onClick={() => setIsDeleteModalVisible(true)}
          className="fixed bottom-6 right-6 bg-red-600 
          cursor-pointer text-white rounded-full p-3 shadow-lg hover:bg-red-700 transition-colors"
          style={{ zIndex: 30 }}
        >
          <Trash2 size={20} />
        </button>
      )}
    </div>
  );
};

export default ProductList;
