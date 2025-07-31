import { JSX } from 'react';

export const Spinner = (): JSX.Element => {
  return (
    <div
      aria-label="spinner"
      className="
      mt-[100px] w-[80px]
      h-[80px] p-2
      rounded-full
      bg-border spinner"
      data-testid="spinner"
    />
  );
};
