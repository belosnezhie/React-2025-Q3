import { JSX, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './pagination.css';

export const Pagination = ({
  pagesCount,
}: {
  pagesCount: number;
}): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [, setSearchParameters] = useSearchParams();

  const handlePageChange = (index: number): void => {
    setCurrentPage(index);
    setSearchParameters({ page: String(index) });
  };

  return (
    <div className="pagination">
      {Array.from({ length: pagesCount }, (_, index) => (
        <button
          className={`pagination_button ${currentPage === index + 1 ? 'active' : ''}`}
          key={index}
          onClick={() => {
            handlePageChange(index + 1);
          }}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
