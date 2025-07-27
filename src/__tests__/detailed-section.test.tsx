import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'vitest';

import { testDataJane } from '@/__tests__/test-utils/test-data';
import { setup } from '@/__tests__/test-utils/user-event-setup';
import { DetailedSection } from '@/components';
import { ApiService } from '@/services/api-service';

describe('Detailed Section Tests', () => {
  it('checks that a loading indicator is displayed while fetching data', () => {
    const service = new ApiService();

    render(
      <BrowserRouter>
        <DetailedSection service={service} />
      </BrowserRouter>,
    );

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toBeDefined();
  });

  it('closes component after click on button', async () => {
    const service = new ApiService();
    vi.spyOn(service, 'getSeachedData').mockResolvedValueOnce(testDataJane);
    const { getByTestId, queryAllByTestId, user } = setup(
      <BrowserRouter>
        <DetailedSection service={service} />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(getByTestId('close')).toBeDefined();
    });

    const button = getByTestId('close');

    user.click(button);

    await waitFor(() => {
      expect(queryAllByTestId('character_data')).toHaveLength(0);
    });
  });

  it('correctly displays detailed card data', async () => {
    const service = new ApiService();
    vi.spyOn(service, 'getSeachedData').mockResolvedValueOnce(testDataJane);
    const { queryAllByTestId } = setup(
      <BrowserRouter>
        <DetailedSection service={service} />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(queryAllByTestId('character_data')).toHaveLength(1);
    });
  });
});
