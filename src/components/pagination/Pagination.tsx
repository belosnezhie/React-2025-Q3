import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

// import { useAppDispatch } from '../../hooks/StateHooks';
// import useLocalStorage from '../../hooks/UseLocalStorage';
// import { setCurrentPage } from '../../store/pageSlice/PageSlice';
import { RootState } from '../../store/Store';

import styles from './Pagination.module.css';

interface PaginationProps {
  pagesCount: number;
  isTest?: boolean;
}

const PaginationRaw = ({ pagesCount, isTest }: PaginationProps) => {
  const pathname = usePathname();
  // const { replace } = useRouter();
  // const searchParams = useSearchParams();
  // const currentPage = useAppSelector(selectPage);
  // const dispatch = useAppDispatch();
  // const { query } = useLocalStorage();

  const router = useRouter();
  const queryParams = useRouter().query;
  const query = queryParams.search ? String(queryParams.search) : '';
  const currentPage = queryParams.page ? Number(queryParams.page) : 1;

  // const handlePageChange = (pageNumber: number) => {
  //   // dispatch(setCurrentPage(pageNumber));
  //   const params = new URLSearchParams(searchParams);

  //   params.set('search', query);
  //   params.set('page', String(pageNumber));
  //   replace(`${pathname}?${params.toString()}`);
  // };

  const handlePageChange = async (pageNumber: number) => {
    // dispatch(setCurrentPage(pageNumber));
    await router.push({
      query: {
        search: query,
        page: pageNumber,
      },
    });
  };

  return (
    <div className={styles.pagination}>
      {Array.from({ length: pagesCount }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`${styles.paginationButton} ${currentPage === index + 1 ? styles.active : ''}`}
          data-testid={`page_button_${index + 1}`}
        >
          {index + 1}
        </button>
      ))}
      {isTest ? <p data-testid="path">{pathname}</p> : null}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const { page } = state;

  return { currentPage: page.currentPage };
};

const Pagination = connect(mapStateToProps)(PaginationRaw);

export default Pagination;
