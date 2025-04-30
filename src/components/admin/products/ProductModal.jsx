import React, { useState, useEffect } from "react";
import FormModal from "../shared/FormModal";
import Variants from "./Variants";
import ProductInformation from "./ProductInformation";

const ProductModal = ({
  isLoading,
  isModalOpen,
  handleCloseModal,
  isEditing,
  handleSubmit,
  formData,
  setFormData,
  categories,
  brands,
  colors,
  sizes,
}) => {
  const [enableVariants, setEnableVariants] = useState(false);
  // Set variants flag based on existing product data
  useEffect(() => {
    if (formData.variants.length > 0) {
      setEnableVariants(true);
    } else {
      setEnableVariants(false);
    }
  }, [isModalOpen]);

  return (
    <FormModal
      isLoading={isLoading}
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title={isEditing ? "Edit Product" : "Add New Product"}
      handleSubmit={handleSubmit}
    >
      {/* Basic Product Information */}
      <ProductInformation
        categories={categories}
        brands={brands}
        formData={formData}
        enableVariants={enableVariants}
        setEnableVariants={setEnableVariants}
        setFormData={setFormData}
      />

      {/* Variants Section */}
      <Variants
        isOpen={enableVariants}
        setFormData={setFormData}
        formData={formData}
        colors={colors}
        sizes={sizes}
      />
    </FormModal>
  );
};

export default ProductModal;
