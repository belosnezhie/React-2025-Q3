import { MemoryRouter } from 'react-router-dom';
import { expect, it } from 'vitest';

import { setup } from '@/__tests__/test-utils/user-event-setup';
import { AboutPage } from '@/pages';

it('can be rendered', () => {
  const { getByTestId } = setup(
    <MemoryRouter initialEntries={[{ pathname: '/', search: '' }]}>
      <AboutPage />
    </MemoryRouter>,
  );

  expect(getByTestId('about_page')).toBeDefined();
});
