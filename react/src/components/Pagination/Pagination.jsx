import PropTypes from "prop-types";
import './Pagination.scss';

function Pagination({ totalPages, currentPage, onPageChange }) {
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage > totalPages - 3) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => {onPageChange(currentPage - 1)}}
        disabled={currentPage < 2}
      >&lt;</button>
      {generatePageNumbers().map((pageNumber, index) => (
        <span
          key={index}
          className={
            pageNumber === currentPage ? "pagination-number active" : "pagination-number"
          }
          onClick={() => {
            if (typeof pageNumber === "number") {
              onPageChange(pageNumber);
            }
          }}
        >
          {pageNumber}
        </span>
      ))}
      <button
        onClick={() => {onPageChange(currentPage + 1)}}
        disabled={currentPage === totalPages}
      >&gt;</button>
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
