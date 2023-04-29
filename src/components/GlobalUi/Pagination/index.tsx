import React from "react";

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageRange = 2;
  const pageNumbers: number[] = [];

  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    if (
      pageNumber === 1 ||
      pageNumber === totalPages ||
      (pageNumber >= currentPage - pageRange &&
        pageNumber <= currentPage + pageRange)
    ) {
      pageNumbers.push(pageNumber);
    }
  }

  const handleClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="flex flex-wrap justify-center mt-8 gap-2">
      {currentPage > 1 && (
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-l"
          onClick={() => handleClick(currentPage - 1)}
        >
          Previous
        </button>
      )}
      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === currentPage) {
          return (
            <button
              key={index}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleClick(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        } else if (
          (index === 0 && pageNumber !== 1) ||
          (index === pageNumbers.length - 1 && pageNumber !== totalPages) ||
          pageNumbers[index + 1] !== pageNumber + 1
        ) {
          return (
            <div key={index} className="flex items-center">
              <div className="bg-white text-green-700 font-bold py-2 px-4 rounded">
                ...
              </div>
              <button
                className="bg-white hover:bg-green-600 text-green-500 font-bold py-2 px-4 rounded ml-2"
                onClick={() => handleClick(pageNumber)}
              >
                {pageNumber}
              </button>
            </div>
          );
        } else {
          return (
            <button
              key={index}
              className="bg-white shadow-lg hover:bg-green-600 hover:text-white text-green-500 font-bold py-2 px-4 rounded"
              onClick={() => handleClick(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        }
      })}
      {currentPage < totalPages && (
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r"
          onClick={() => handleClick(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
