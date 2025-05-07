import React, { useEffect, useState } from "react";
import FormModal from "../shared/FormModal";
import ImageUploader from "../shared/ImageUploader";

const CategoryModal = ({
  isOpen,
  handleSubmit,
  onClose,
  isEditing,
  formData,
  handleInputChange,
  handleImageUploaded,
  isLoading,
}) => {
  const handleToggleChange = () => {
    handleInputChange({
      target: {
        name: "IsActive",
        value: !formData.IsActive,
      },
    });
  };

  if (!isOpen) return null;

  return (
    <FormModal
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Category" : "Add New Category"}
    >
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Category Image
        </label>
        <ImageUploader
          aspectRatio="aspect-auto"
          maxWidth="max-w-full"
          initialImage={formData.imageUrl}
          onImageUpload={handleImageUploaded}
          containerClassName=" max-[250px] "
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
          placeholder="Enter category name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
          placeholder="Enter category description"
          rows="3"
        />
      </div>
      {/* Toggle button for active status */}
      <div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={formData.isActive}
              onChange={handleToggleChange}
            />
            <div
              className={`block w-12 h-6 rounded-full transition-colors ${
                formData.IsActive ? "bg-[#005C53]" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                formData.IsActive ? "transform translate-x-6" : ""
              }`}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-700">
            {formData.IsActive ? "Active" : "Inactive"}
          </span>
        </label>
        <p className="text-xs text-gray-500 mt-1">
          {formData.IsActive
            ? "This brand will be visible to customers"
            : "This brand will be hidden from customers"}
        </p>
      </div>
    </FormModal>
  );
};

export default CategoryModal;
