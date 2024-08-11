import { headers } from 'next/headers';
import Link from 'next/link';

import { getSearchParams } from '../../app/searchParams';

import styles from './Pagination.module.css';

interface PaginationProps {
  pagesCount: number;
  isTest?: boolean;
}

const Pagination = ({ pagesCount }: PaginationProps) => {
  const currentPage = Number(getSearchParams(headers()).page);
  const query = getSearchParams(headers()).query;

  return (
    <div className={styles.pagination}>
      {Array.from({ length: pagesCount }, (_, index) => (
        <Link
          href={`/?page=${index + 1}&search=${query}`}
          className={`${styles.paginationButton} ${currentPage === index + 1 ? styles.active : ''}`}
          key={index}
        >
          {index + 1}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
