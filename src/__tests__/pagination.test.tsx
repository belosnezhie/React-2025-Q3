import { waitFor } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom';
import { expect } from 'vitest';

import { Pagination } from '@/components';

import { setup } from './test-utils/user-event-setup';

describe('Pagination tests', () => {
  it('renders correct amount of buttons and enables page button as active', async () => {
    const { getByTestId, user } = setup(
      <MemoryRouter initialEntries={[{ pathname: '/', search: '' }]}>
        <Pagination pagesCount={2} />
      </MemoryRouter>,
    );

    const paginationButton2 = getByTestId('page_button_2');
    expect(paginationButton2).not.toHaveClass('active');

    user.click(paginationButton2);

    await waitFor(() => {
      expect(paginationButton2).toHaveClass('bg-border');
    });
  });
});
