import React, { useState, useEffect } from "react";
import FormModal from "../shared/FormModal";
import Variants from "./Variants";
import ProductInformation from "./ProductInformation";

/**
 * Modal component for adding or editing product information
 * @param {boolean} isLoading - Whether the form submission is in progress
 * @param {boolean} isModalOpen - Whether the modal is visible
 * @param {Function} handleCloseModal - Function to close the modal
 * @param {boolean} isEditing - Whether we're editing an existing product
 * @param {Function} handleSubmit - Form submission handler
 * @param {Object} formData - Current product form data
 * @param {Function} setFormData - Function to update form data
 * @param {Array} categories - List of available categories
 * @param {Array} brands - List of available brands
 * @param {Array} colors - List of available colors
 * @param {Array} sizes - List of available sizes
 */

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
