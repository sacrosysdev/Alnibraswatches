/**
 * Truncates text to a specified length and adds ellipsis if needed
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @param {string} ellipsis - The ellipsis character(s) to append (default: "...")
 * @returns {string} - The truncated text
 */
export const truncateText = (text, maxLength = 50, ellipsis = "...") => {
  if (!text || typeof text !== "string") {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + ellipsis;
};

/**
 * Truncates title specifically for shop cards
 * @param {string} title - The title to truncate
 * @param {number} maxLength - Maximum length before truncation (default: 30)
 * @returns {string} - The truncated title
 */
export const truncateTitle = (title, maxLength = 30) => {
  return truncateText(title, maxLength, "...");
};
