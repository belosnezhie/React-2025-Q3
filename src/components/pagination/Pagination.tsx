import './Pagination.css';
import { useLocation } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  pagesCount: number;
  updatePageCallback: (pageNumber: number) => void;
  isTest?: boolean;
}

const Pagination = ({
  updatePageCallback,
  pagesCount,
  currentPage,
  isTest,
}: PaginationProps) => {
  const location = useLocation().pathname;

  return (
    <div className="pagination">
      {Array.from({ length: pagesCount }, (item, index) => (
        <button
          key={index}
          onClick={() => {
            console.log(item);
            updatePageCallback(index + 1);
          }}
          className={`pagination_button ${currentPage === index + 1 ? 'active' : ''}`}
          data-testid={`page_button_${index + 1}`}
        >
          {index + 1}
        </button>
      ))}
      {isTest ? <p data-testid="path">{location}</p> : null}
    </div>
  );
};

export default Pagination;
