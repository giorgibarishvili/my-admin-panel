import React from "react";
import ArrowRight from "../assets/icons/arrow-right-solid.svg";
import ArrowLeft from "../assets/icons/arrow-left-solid.svg";
import { PaginationProps } from "../models/UserModels";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <ol className="flex justify-center gap-1 text-xs font-medium overflow-hidden mt-5">
      <li>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
          disabled={currentPage === 1}
        >
          <img src={ArrowLeft} alt="previous" />
        </button>
      </li>
      {Array.from({ length: totalPages }, (_, index) => (
        <li key={index + 1}>
          <button
            onClick={() => handlePageChange(index + 1)}
            className={`block size-8 rounded border ${
              currentPage === index + 1
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-100 bg-white text-gray-900"
            } text-center leading-8`}
          >
            {index + 1}
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
          disabled={currentPage === totalPages}
        >
          <img src={ArrowRight} alt="next" />
        </button>
      </li>
    </ol>
  );
}
export default Pagination;
