import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';

import Pagination from './Pagination.tsx';

const asyncMock = vi.fn().mockResolvedValue('default');

test('should updates URL query parameter when page changes', () => {
  Object.defineProperty(window, 'location', {
    value: {
      search: '',
    },
  });

  render(
    <MemoryRouter initialEntries={[{ pathname: '/', search: '' }]}>
      <Pagination
        updatePageCallback={asyncMock}
        pagesCount={2}
        currentPage={1}
        isTest={true}
      />
    </MemoryRouter>,
  );

  const paginationButton = screen.getByTestId('page_button_2');

  fireEvent.click(paginationButton);

  expect(asyncMock.mock.calls).lengthOf(1);
  expect(asyncMock.mock.calls[0]).toEqual([2]);
});
