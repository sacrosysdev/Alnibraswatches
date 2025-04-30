import React, { useRef, useState } from "react";
import CurrentVariants from "./CurrentVariants";
import AddNewVariant from "./AddNewVariant";

const Variants = ({ isOpen, setFormData, formData, sizes, colors }) => {
  // Create a ref for the variants list section
  const [editingVariantIndex, setEditingVariantIndex] = useState(null);
  const [addVarinatIndex, setAddVariantIndex] = useState(null);
  const variantsListRef = useRef(null);
  const addNewVariantFormRef = useRef(null);
  const [currentVariant, setCurrentVariant] = useState({
    brandId: formData.brandID || 0,
    colorId: 0,
    sizeId: 0,
    sku: "",
    price: {
      price: 0,
      discountPercentage: 0,
      discountPrice: 0,
      currency: "USD",
    },
    stock: {
      onhand: 0,
    },
    images: [],
  });

  // Handle variant input change
  const handleVariantChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      // Handle nested properties like price.price
      const [parent, child] = name.split(".");
      setCurrentVariant((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: name.includes("price") ? parseFloat(value) || 0 : value,
        },
      }));
    } else {
      // Handle regular properties
      setCurrentVariant((prev) => ({
        ...prev,
        [name]:
          name === "brandId" || name === "colorId" || name === "sizeId"
            ? parseInt(value) || 0
            : value,
      }));
    }
  };
  // Remove a variant from the list
  const removeVariant = (index) => {
    setEditingVariantIndex(index);
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index
          ? { ...variant, stock: { onhand: 0, stockId: variant.stock.stockId } }
          : variant
      ),
    }));
    // setFormData((prev) => ({
    //   ...prev,
    //   variants: prev.variants.filter((_, i) => i !== index),
    // }));
  };
  // Add a variant to the list
  const addVariant = () => {
    // check is it editing or not
    if (editingVariantIndex !== null) {
      // update variants
      const updatedVariants = [currentVariant];
      updatedVariants[editingVariantIndex] = currentVariant;

      setFormData((prev) => ({
        ...prev,
        variants: prev.variants.map((item, index) =>
          index === editingVariantIndex ? updatedVariants[0] : item
        ),
      }));
      setCurrentVariant(updatedVariants);
      setEditingVariantIndex(null);
      setAddVariantIndex(null);
      // Reset current variant form
      setCurrentVariant({
        brandId: formData.brandID || 0,
        colorId: 0,
        sizeId: 0,
        sku: "",
        price: {
          price: 0,
          discountPercentage: 0,
          discountPrice: 0,
          currency: "USD",
        },
        stock: {
          onhand: 0,
        },
        images: [],
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        variants: [...(prev.variants || []), { ...currentVariant }],
      }));

      // Reset current variant form
      setCurrentVariant({
        brandId: formData.brandID || 0,
        colorId: 0,
        sizeId: 0,
        sku: "",
        price: {
          price: 0,
          discountPercentage: 0,
          discountPrice: 0,
          currency: "USD",
        },
        stock: {
          onhand: 0,
        },
        images: [],
      });
    }
  };
  const editVariant = (index) => {
    setEditingVariantIndex(index);
    setAddVariantIndex(index);
    setCurrentVariant(formData.variants[index]);
    // scroll to the form
    if (addNewVariantFormRef && addNewVariantFormRef.current) {
      addNewVariantFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  // Handle variant image upload
  const handleVariantImageUploaded = (data) => {
    if (data && data.FileDetails) {
      const newImage = {
        imageUrl: data.FileDetails[0].FileUrl,
        isPrimary: currentVariant.images.length === 0, // Make first image primary
      };
      setCurrentVariant((prev) => ({
        ...prev,
        images: [...prev.images, newImage],
      }));
    }
  };
  if (!isOpen) return null;

  return (
    <section className="mt-6 border-t border-gray-200 pt-4">
      <h3 className=" font-medium text-gray-800 mb-4">Variants</h3>
      {/* Current Variants List */}
      <CurrentVariants
        variantsListRef={variantsListRef}
        variants={formData.variants}
        removeVariant={removeVariant}
        editVariant={editVariant}
      />
      {/* Add New Variant Form */}
      <AddNewVariant
        addVarinatIndex={addVarinatIndex}
        variantsListRef={variantsListRef}
        addNewVariantFormRef={addNewVariantFormRef}
        sizes={sizes}
        colors={colors}
        editingVariantIndex={editingVariantIndex}
        addVariant={addVariant}
        currentVariant={currentVariant}
        handleVariantChange={handleVariantChange}
        setCurrentVariant={setCurrentVariant}
      />
    </section>
  );
};

export default Variants;
