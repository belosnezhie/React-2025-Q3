import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, MockedFunction, vi } from 'vitest';

import * as hooks from '@/hooks/use-local-storage';
import { DefaultSearchResp } from '@/model/types-star-wars';
import { ApiService } from '@/services/api-service';

import { MainPage } from '../pages/main/main-page';

describe('Integration Tests', () => {
  beforeAll(() => {
    vi.mock('@/hooks/use-local-storage');
  });
  let mock: MockedFunction<
    (initialValue: string) => [string, (nextState: string) => void]
  >;
  beforeEach(() => {
    mock = vi.mocked(hooks.useLocalStorage).mockReturnValue([
      'Jane Doe',
      (_: string): void => {
        // do nothing
      },
    ]);
  });
  afterEach(() => {
    mock.mockReset();
  });

  it.skip('makes initial API call on component mount', async () => {
    const mockService: ApiService = {
      getDefaultData: vi.fn().mockResolvedValue(new DefaultSearchResp()),
      getSeachedData: vi.fn(),
    } satisfies ApiService;

    render(
      <BrowserRouter>
        <MainPage service={mockService} />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(mock).toHaveBeenCalled();
    });
  });

  it.skip('handles search term from localStorage on initial load', async () => {
    render(
      <BrowserRouter>
        <MainPage service={new ApiService()} />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(mock).toHaveBeenCalled();
    });
  });

  it.skip('manages loading states during API calls', async () => {
    render(
      <BrowserRouter>
        <MainPage service={new ApiService()} />
      </BrowserRouter>,
    );

    const spinner = screen.findByRole('spinner');

    await waitFor(() => {
      expect(spinner).toBeDefined();
    });
  });
});
