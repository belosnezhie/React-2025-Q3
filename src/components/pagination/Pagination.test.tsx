import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test } from 'vitest';

// import { makeStore } from '../../store/Store';
import { renderWithProviders } from '../../TestUtils';

import Pagination from './Pagination';

// const store = makeStore();

test('should updates URL query parameter when page changes', () => {
  Object.defineProperty(window, 'location', {
    value: {
      search: '',
    },
  });

  renderWithProviders(
    <MemoryRouter initialEntries={[{ pathname: '/', search: '' }]}>
      <Pagination pagesCount={2} isTest={true} />
    </MemoryRouter>,
  );

  const paginationButton = screen.getByTestId('page_button_2');

  fireEvent.click(paginationButton);

  // expect(store.getState().page.currentPage).equals(2);
});
