import { PlusCircle, X } from "lucide-react";
import React, { useState, useEffect } from "react";

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
  // State for tooltip visibility
  const [showTooltip, setShowTooltip] = useState(false);

  // Use localStorage to track if tooltip has been shown before
  useEffect(() => {
    // Check if tooltip has been shown before
    const hasSeenTooltip = localStorage.getItem("hasSeenGridTooltip");

    if (!hasSeenTooltip) {
      // If not shown before, show it and set the flag
      setShowTooltip(true);
      localStorage.setItem("hasSeenGridTooltip", "true");
    }
  }, []);

  // Default button styling
  const defaultButtonClass =
    "flex items-center gap-2 bg-green-700 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-green-800 transition-colors";

  // Function to close tooltip
  const closeTooltip = (e) => {
    e.stopPropagation();
    setShowTooltip(false);
  };

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
        {/* View toggle button with tooltip */}
        {viewToggle && (
          <div className="relative">
            <button
              onClick={() => viewToggle.setViewMode((prev) => !prev)}
              className="group cursor-pointer p-2 rounded-full hover:bg-gray-100"
            >
              {viewToggle.isGridView
                ? viewToggle.gridIcon
                : viewToggle.alternateIcon}
            </button>

            {/* Professional tooltip with close button - only shows first time */}
            {showTooltip && (
              <div
                className="absolute right-0 top-12 w-64
               bg-white rounded-lg shadow-lg border border-gray-200 z-[1000] p-3 text-sm"
              >
                <div className="absolute -top-2 right-4 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-200"></div>
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-gray-800">Layout tip</div>
                  <button
                    onClick={closeTooltip}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="text-gray-600">
                  You can rearrange items by drag and drop to customize your
                  view
                </p>
              </div>
            )}
          </div>
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
