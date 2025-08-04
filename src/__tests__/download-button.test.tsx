import { screen } from '@testing-library/react';

import { DownloadButton } from '@/components';
import { addToFavorites, store } from '@/state';

import { renderWithProviders } from './test-utils/provider';
import { testDataJane } from './test-utils/test-data';

describe('Download Button Tests', () => {
  store.dispatch(addToFavorites(testDataJane));
  global.URL.createObjectURL = vi.fn();

  it('renders download link with correct text', () => {
    renderWithProviders(<DownloadButton />, {
      testStore: store,
    });

    const link = screen.getByRole('link', { name: /download/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('Download');
  });

  it('generates a download link with correct filename', () => {
    renderWithProviders(<DownloadButton />, {
      testStore: store,
    });

    const link = screen.getByRole('link', { name: /download/i });
    expect(link).toHaveAttribute('download', '1_characters');
  });
});
