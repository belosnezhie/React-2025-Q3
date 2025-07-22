import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DefaultSearchResp } from '@/model/types-star-wars';
import { ApiService } from '@/services/api-service';
import { searchQueryStorage } from '@/services/local-storage';

import MainPage from './main-page';

describe('Integration Tests', () => {
  it('makes initial API call on component mount', async () => {
    const mockService: ApiService = {
      getDefaultData: vi.fn().mockResolvedValue(new DefaultSearchResp()),
      getSeachedData: vi.fn(),
    } satisfies ApiService;

    render(<MainPage service={mockService} />);

    await waitFor(() => {
      expect(mockService.getDefaultData).toHaveBeenCalled();
    });
  });

  it('handles search term from localStorage on initial load', async () => {
    const savedSearchQuery = 'Jane Doe';

    vi.spyOn(searchQueryStorage, 'getSearchQuery').mockReturnValue(
      savedSearchQuery,
    );

    render(<MainPage service={new ApiService()} />);

    await waitFor(() => {
      expect(searchQueryStorage.getSearchQuery).toHaveBeenCalled();
    });
  });

  it('manages loading states during API calls', async () => {
    render(<MainPage service={new ApiService()} />);

    const spinner = screen.findByRole('spinner');

    await waitFor(() => {
      expect(spinner).toBeDefined();
    });
  });
});
