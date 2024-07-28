import { connect } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/StateHooks';
import useLocalStorage from '../../hooks/UseLocalStorage';
import { selectPage, setCurrentPage } from '../../store/pageSlice/PageSlice';
import { RootState } from '../../store/Store';

import './Pagination.css';

interface PaginationProps {
  pagesCount: number;
  isTest?: boolean;
}

const PaginationRaw = ({ pagesCount, isTest }: PaginationProps) => {
  const location = useLocation().pathname;
  const currentPage = useAppSelector(selectPage);
  const dispatch = useAppDispatch();
  const { query } = useLocalStorage();
  const [, setSearchParams] = useSearchParams();

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));

    setSearchParams({ search: query, page: String(pageNumber) });
  };

  return (
    <div className="pagination">
      {Array.from({ length: pagesCount }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
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

const mapStateToProps = (state: RootState) => {
  const { page } = state;

  return { currentPage: page.currentPage };
};

const Pagination = connect(mapStateToProps)(PaginationRaw);

export default Pagination;
