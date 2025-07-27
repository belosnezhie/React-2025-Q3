import { waitFor } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';

import { setup } from '@/__tests__/test-utils/user-event-setup';
import { Pagination } from '@/components';

test('should enable page button as active', async () => {
  const { getByTestId, user } = setup(
    <MemoryRouter initialEntries={[{ pathname: '/', search: '' }]}>
      <Pagination pagesCount={2} />
    </MemoryRouter>,
  );

  const paginationButton2 = getByTestId('page_button_2');
  expect(paginationButton2).not.toHaveClass('active');

  user.click(paginationButton2);

  await waitFor(() => {
    expect(paginationButton2).toHaveClass('active');
  });
});
