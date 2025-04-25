import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Set a small timeout to trigger the animation after the component is rendered
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-end z-50">
      <div
        className={`bg-white rounded-lg overflow-hidden h-full max-h-[96vh] 
        flex flex-col shadow-lg w-full max-w-md p-6
        transform transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            {isEditing ? "Edit Category" : "Add New Category"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 cursor-pointer hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col overflow-y-auto h-full pr-2"
        >
          <div className="space-y-4 h-full flex flex-col">
            <div className="h-full overflow-y-auto flex flex-col gap-y-4 ">
              <div>
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
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border cursor-pointer hover:bg-black hover:text-white border-gray-300 rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#005C53] text-white
                cursor-pointer rounded-md text-sm hover:bg-[#005C53]/70"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <div
                      className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2
                     border-white rounded-full"
                    ></div>
                    Saving...
                  </span>
                ) : (
                  "Save Category"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
