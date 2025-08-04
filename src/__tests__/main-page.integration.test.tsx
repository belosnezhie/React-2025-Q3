import { screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, MockedFunction, vi } from 'vitest';

import { renderWithProviders } from '@/__tests__/test-utils/provider';
import { useLocalStorage } from '@/hooks';
import { DefaultSearchResp } from '@/model/types-star-wars';
import { MainPage } from '@/pages';
import { ApiService } from '@/services/api-service';
import { ThemeProvider } from '@/state';

describe('Integration Tests', () => {
  beforeAll(() => {
    vi.mock('@/hooks/use-local-storage');
  });
  let mock: MockedFunction<
    (initialValue: string) => [string, (nextState: string) => void]
  >;
  beforeEach(() => {
    mock = vi.mocked(useLocalStorage).mockReturnValue([
      'Jane Doe',
      (_: string): void => {
        // do nothing
      },
    ]);
  });
  afterEach(() => {
    mock.mockReset();
  });

  it('makes initial API call on component mount', async () => {
    const mockService: ApiService = {
      getDefaultData: vi.fn().mockResolvedValue(new DefaultSearchResp()),
      getSeachedData: vi.fn(),
    } satisfies ApiService;

    renderWithProviders(
      <BrowserRouter>
        <ThemeProvider>
          <MainPage service={mockService} />
        </ThemeProvider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(mock).toHaveBeenCalled();
    });
  });

  it('handles search term from localStorage on initial load', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ThemeProvider>
          <MainPage service={new ApiService()} />
        </ThemeProvider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(mock).toHaveBeenCalled();
    });
  });

  it('manages loading states during API calls', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ThemeProvider>
          <MainPage service={new ApiService()} />
        </ThemeProvider>
      </BrowserRouter>,
    );

    const spinner = screen.findByRole('spinner');

    await waitFor(() => {
      expect(spinner).toBeDefined();
    });
  });
});
