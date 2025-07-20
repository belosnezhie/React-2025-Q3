import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DefaultSearchResp } from '../model/types-star-wars';
import { ApiService } from '../services/api-service';
import { searchQueryStorage } from '../services/local-storage';

import MainPage from './main-page.tsx';

describe('Integration Tests', () => {
  it('makes initial API call on component mount', () => {
    const mockService = {
      getDefaultData: vi.fn().mockResolvedValue(new DefaultSearchResp()),
    } as unknown as ApiService;

    act(() => {
      render(<MainPage service={mockService} />);
    });

    expect(mockService.getDefaultData).toHaveBeenCalled();
  });

  it('handles search term from localStorage on initial load', () => {
    const savedSearchQuery = 'Jane Doe';

    vi.spyOn(searchQueryStorage, 'getSearchQuery').mockReturnValue(
      savedSearchQuery,
    );

    render(<MainPage service={new ApiService()} />);

    expect(searchQueryStorage.getSearchQuery).toHaveBeenCalled();
  });

  it('manages loading states during API calls', () => {
    render(<MainPage service={new ApiService()} />);

    const spinner = screen.findByRole('spinner');

    expect(spinner).toBeDefined();
  });
});
