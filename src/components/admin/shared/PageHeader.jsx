import { PlusCircle } from "lucide-react";
import React from "react";

/**
 * A reusable header component for pages with search and action buttons
 * @param {Object} props
 * @param {string} props.searchQuery - Current search query
 * @param {Function} props.setSearchQuery - Function to update search query
 * @param {string} props.searchPlaceholder - Placeholder text for search input
 * @param {Object} props.viewToggle - Configuration for view toggle button (optional)
 * @param {boolean} props.viewToggle.isGridView - Current view state
 * @param {Function} props.viewToggle.setViewMode - Function to toggle view
 * @param {React.ReactNode} props.viewToggle.gridIcon - Icon for grid view
 * @param {React.ReactNode} props.viewToggle.alternateIcon - Icon for alternate view
 * @param {Object} props.actionButton - Configuration for primary action button (optional)
 * @param {string} props.actionButton.label - Button label text
 * @param {Function} props.actionButton.onClick - Button click handler
 * @param {React.ReactNode} props.actionButton.icon - Button icon
 * @param {string} props.actionButton.className - Additional classes for action button
 * @param {React.ReactNode} props.children - Additional content for the header
 */
const PageHeader = ({
  searchQuery = "",
  setSearchQuery = () => {},
  searchPlaceholder = "Search...",
  viewToggle,
  actionButton,
  children,
}) => {
  // Default button styling
  const defaultButtonClass =
    "flex items-center gap-2 bg-[#005C53] text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-[#005C53]/80 transition-colors";

  return (
    <div className="flex items-center justify-between">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-sm border bg-white border-gray-200 outline-none rounded-lg text-sm p-3"
        placeholder={searchPlaceholder}
      />

      <div className="flex items-center gap-x-3 justify-end">
        {/* Optional view toggle button */}
        {viewToggle && (
          <button
            onClick={() => viewToggle.setViewMode((prev) => !prev)}
            className="group cursor-pointer"
          >
            {viewToggle.isGridView
              ? viewToggle.gridIcon
              : viewToggle.alternateIcon}
          </button>
        )}

        {/* Optional action button */}
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className={actionButton.className || defaultButtonClass}
          >
            {actionButton.icon}
            <span>{actionButton.label}</span>
          </button>
        )}

        {/* Additional content */}
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
