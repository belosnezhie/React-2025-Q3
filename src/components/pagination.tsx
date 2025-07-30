import { JSX } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Pagination = ({
  pagesCount,
}: {
  pagesCount: number;
}): JSX.Element => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const currentPage = Number(searchParameters.get('page')) || 1;

  const handlePageChange = (index: number): void => {
    setSearchParameters({ page: String(index) });
  };

  return (
    <div className="flex gap-4 z-20000 flex-wrap justify-center">
      {Array.from({ length: pagesCount }, (_, index) => (
        <button
          className={`
            w-[50px]
            h-[50px]
            rounded-full
            bg-background
            border-0
            cursor-pointer
            transition-transform
            duration-300
            hover:scale-[0.95]
            ${currentPage === index + 1 ? 'bg-border' : ''}`}
          data-testid={`page_button_${index + 1}`}
          key={index}
          name={index.toString()}
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
