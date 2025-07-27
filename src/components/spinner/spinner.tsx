import { JSX } from 'react';

import './spinner.css';

export const Spinner = (): JSX.Element => {
  return <div aria-label="spinner" className="spinner" data-testid="spinner" />;
};
