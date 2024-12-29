import React, { useState } from "react";
import {
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
} from "react-icons/md";
import { useSelector } from "react-redux";

const Pagination = ({ meta, onPageChange }) => {
  const darkMode = useSelector((state) => state.app.darkMode);
  const [currentWindow, setCurrentWindow] = useState(1); // Tracks the current visible window of pages
  const maxVisiblePages = 5; // Number of visible pages in the pagination

  const totalPages = meta?.total_pages || 1;
  const currentPage = meta?.current_page || 1;

  // Calculate the range of pages to display
  const getPageNumbers = () => {
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Ensure we always show `maxVisiblePages` unless there are fewer total pages
    const adjustedStartPage = Math.max(
      1,
      Math.min(startPage, totalPages - maxVisiblePages + 1)
    );
    const adjustedEndPage = Math.min(totalPages, adjustedStartPage + maxVisiblePages - 1);

    const pages = [];
    for (let i = adjustedStartPage; i <= adjustedEndPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getPageNumbers();

  return (
    <div
      className={`sm:flex items-center  m-4 ${
        darkMode ? "text-gray-200" : "text-gray-900"
      }`}
    >
      <p className="text-sm flex-1">
        Showing {meta.next_page ? meta.per_page : meta.total_count - meta.offset_value} of{" "}
        {meta.total_count || "?"} entries
      </p>

      <div className="flex items-center max-md:mt-4">
        <ul className="flex space-x-1 ml-2 text-xl">
          {/* Previous Page Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className={`flex items-center justify-center w-7 h-7 rounded ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                : "bg-blue-100 hover:bg-blue-200 text-blue-600"
            }`}
            aria-label="Previous Page"
            disabled={currentPage === 1}
          >
            <MdOutlineChevronLeft />
          </button>

          {/* Start with 1 if not in visible range */}
          {visiblePages[0] > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className={`flex items-center justify-center text-sm w-7 h-7 rounded ${
                  currentPage === 1
                    ? darkMode
                      ? "bg-gray-400 text-white"
                      : "bg-blue-500 text-white"
                    : darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-200 hover:bg-gray-400 text-gray-800"
                }`}
                aria-label={`Page 1`}
              >
                1
              </button>
              <span className="text-sm mx-1">...</span>
            </>
          )}

          {/* Page Numbers */}
          {visiblePages.map((pageNumber) => {
            const isActive = pageNumber === currentPage;

            return (
              <button
                onClick={() => onPageChange(pageNumber)}
                key={pageNumber}
                className={`flex items-center justify-center text-sm w-7 h-7 rounded ${
                  isActive
                    ? darkMode
                      ? "bg-gray-400 text-white"
                      : "bg-blue-500 text-white"
                    : darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-200 hover:bg-gray-400 text-gray-800"
                }`}
                aria-label={`Page ${pageNumber}`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* End with total_pages if not in visible range */}
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              <span className="text-sm mx-1">...</span>
              <button
                onClick={() => onPageChange(totalPages)}
                className={`flex items-center justify-center text-sm w-7 h-7 rounded ${
                  currentPage === totalPages
                    ? darkMode
                      ? "bg-gray-400 text-white"
                      : "bg-blue-500 text-white"
                    : darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-200 hover:bg-gray-400 text-gray-800"
                }`}
                aria-label={`Page ${totalPages}`}
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next Page Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={`flex items-center justify-center w-7 h-7 rounded ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-700 text-gray-300"
                : "bg-blue-100 hover:bg-blue-300 text-blue-600"
            }`}
            aria-label="Next Page"
            disabled={!meta?.next_page}
          >
            <MdOutlineChevronRight />
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
