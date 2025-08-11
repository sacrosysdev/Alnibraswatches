/**
 * Button hover effect utility classes
 * Provides consistent hover effects for different button types across the application
 */

// Primary button styles (dark background)
export const primaryButtonClasses = {
  base: "bg-[#00211E] text-white rounded-lg py-3 px-6 transition-all duration-300 ease-in-out",
  hover: "hover:bg-[#001815] hover:shadow-lg hover:scale-105",
  disabled: "opacity-50 cursor-not-allowed",
  enabled: "cursor-pointer",
};

// Secondary button styles (outlined)
export const secondaryButtonClasses = {
  base: "bg-white text-[#010F17] border border-[#010F17] rounded-lg py-3 px-6 transition-all duration-300 ease-in-out",
  hover: "hover:bg-[#010F17] hover:text-white hover:shadow-lg hover:scale-105",
  disabled: "opacity-50 cursor-not-allowed",
  enabled: "cursor-pointer",
};

// Success button styles (green)
export const successButtonClasses = {
  base: "bg-green-600 text-white rounded-lg py-3 px-6 transition-all duration-300 ease-in-out",
  hover: "hover:bg-green-700 hover:shadow-lg hover:scale-105",
  disabled: "opacity-50 cursor-not-allowed",
  enabled: "cursor-pointer",
};

// Danger button styles (red)
export const dangerButtonClasses = {
  base: "bg-red-600 text-white rounded-lg py-3 px-6 transition-all duration-300 ease-in-out",
  hover: "hover:bg-red-700 hover:shadow-lg hover:scale-105",
  disabled: "opacity-50 cursor-not-allowed",
  enabled: "cursor-pointer",
};

// Small button styles (for quantity controls, etc.)
export const smallButtonClasses = {
  base: "w-10 h-10 border border-gray-300 text-xl flex items-center justify-center transition-all duration-200 ease-in-out",
  hover: "hover:bg-gray-100 hover:border-gray-400",
  disabled: "opacity-50 cursor-not-allowed",
  enabled: "cursor-pointer",
};

// Icon button styles
export const iconButtonClasses = {
  base: "p-2 rounded-full transition-all duration-200 ease-in-out",
  hover: "hover:bg-gray-100 hover:scale-110",
  disabled: "opacity-50 cursor-not-allowed",
  enabled: "cursor-pointer",
};

// Text button styles
export const textButtonClasses = {
  base: "text-blue-600 hover:text-blue-800 transition-colors duration-200 ease-in-out",
  hover: "hover:underline",
  disabled: "opacity-50 cursor-not-allowed",
  enabled: "cursor-pointer",
};

/**
 * Helper function to combine button classes
 * @param {Object} buttonClasses - The button class object
 * @param {boolean} isDisabled - Whether the button is disabled
 * @returns {string} - Combined CSS classes
 */
export const getButtonClasses = (buttonClasses, isDisabled = false) => {
  const { base, hover, disabled, enabled } = buttonClasses;
  return `${base} ${isDisabled ? disabled : `${enabled} ${hover}`}`;
};

/**
 * Common button hover effects that can be applied to any button
 */
export const commonButtonHover = {
  // Standard hover effects
  standard:
    "transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105",

  // Subtle hover effects
  subtle: "transition-all duration-200 ease-in-out hover:scale-102",

  // Color transition effects
  colorTransition: "transition-colors duration-200 ease-in-out",

  // Background hover effects
  bgHover: "transition-all duration-200 ease-in-out hover:bg-gray-50",

  // Border hover effects
  borderHover: "transition-all duration-200 ease-in-out hover:border-gray-400",
};
