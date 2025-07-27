import { MemoryRouter } from 'react-router-dom';
import { expect, it } from 'vitest';

import { setup } from '@/__tests__/test-utils/user-event-setup';
import { NotFoundPage } from '@/pages';

it('can be rendered', () => {
  const { getByTestId } = setup(
    <MemoryRouter initialEntries={[{ pathname: '/', search: '' }]}>
      <NotFoundPage />
    </MemoryRouter>,
  );

  expect(getByTestId('not_found_page')).toBeDefined();
});
