import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export const NotFoundPage = (): React.ReactElement => {
  return (
    <div
      className={twMerge(
        'min-w-full min-h-screen',
        'flex flex-col justify-center',
        'gap-4 items-center bg-error',
      )}
      data-testid="not_found_page"
    >
      <h2>404 - Not Found</h2>
      <h3>Sorry, the page you are looking for does not exist.</h3>
      <Link
        className={twMerge(
          'mt-[20px] no-underline',
          'text-border transition-al',
          'duration-300 hover:scale-[1.08]',
        )}
        to="/"
      >
        &larr; Go to Main
      </Link>
    </div>
  );
};
