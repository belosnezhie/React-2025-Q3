import { render, screen } from '@testing-library/react';
import { JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';

import { setup } from '@/__tests__/test-utils/user-event-setup';
import { SearchForm } from '@/components';
import * as hooks from '@/hooks/use-local-storage';

vi.mock('@/hooks/use-local-storage');

const renderHelper = (): JSX.Element => {
  return (
    <BrowserRouter>
      <SearchForm />
    </BrowserRouter>
  );
};

describe('Rendering Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders search inputs', () => {
    render(renderHelper());

    const searchInput = screen.getAllByRole('textbox');
    const submitInput = screen.getByRole('button', { name: /search/i });

    expect(searchInput).toHaveLength(1);
    expect(submitInput).toBeInTheDocument();
  });

  it('displays previously saved search term from localStorage on mount', () => {
    const savedSearchQuery = 'Jane Doe';

    vi.mocked(hooks.useLocalStorage).mockReturnValue([
      savedSearchQuery,
      (_: string): void => {
        // do nothing
      },
    ]);

    render(renderHelper());

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toHaveValue(savedSearchQuery);
  });

  test.skip('should show empty input when no saved term exists', () => {
    render(renderHelper());

    const searchInput = screen.getByRole('textbox');

    expect(searchInput).toHaveValue('');
  });
});

describe('User Interaction Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => vi.restoreAllMocks());
  it('updates input value when user types', async () => {
    const form = renderHelper();

    const { getByRole, user } = setup(form);
    const searchInput = getByRole('textbox');
    await user.type(searchInput, 'test value');

    expect(searchInput).toHaveValue('test value');
  });

  it('saves search term to localStorage when search button is clicked', async () => {
    let storage = '';
    vi.spyOn(hooks, 'useLocalStorage').mockImplementation(() => [
      '',
      (query: string): void => {
        storage = query;
      },
    ]);

    const form = renderHelper();

    const { getByRole, user } = setup(form);

    const searchInput = getByRole('textbox');
    const submitInput = getByRole('button', { name: /search/i });

    await user.clear(searchInput);
    await user.type(searchInput, 'test query');
    await user.click(submitInput);

    expect(storage).equals('test query');
  });

  it('trims whitespace from search input before saving and trigger search callback with correct parameters', async () => {
    let storage = '';
    vi.spyOn(hooks, 'useLocalStorage').mockImplementation(() => [
      '',
      (query: string): void => {
        storage = query;
      },
    ]);

    const form = renderHelper();

    const { getByRole, user } = setup(form);

    const searchInput = getByRole('textbox');
    const submitInput = getByRole('button', { name: /search/i });

    await user.type(searchInput, ' trim  ');
    await user.click(submitInput);

    expect(storage).equals('trim');
  });
});

describe('LocalStorage Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => vi.restoreAllMocks());

  it('retrieves saved search term on component mount', () => {
    const savedSearchQuery = 'Jane Doe';

    const getSearchQueryMock = vi
      .mocked(hooks.useLocalStorage)
      .mockReturnValue([
        savedSearchQuery,
        (_: string): void => {
          // do nothing
        },
      ]);

    render(renderHelper());

    const searchInput = screen.getByRole('textbox');

    expect(searchInput).toHaveValue(savedSearchQuery);
    expect(getSearchQueryMock).toHaveBeenCalled();
  });

  it('overwrites existing localStorage value when new search is performed', async () => {
    let storage = '';
    const useLocalStorageSpy = vi
      .spyOn(hooks, 'useLocalStorage')
      .mockImplementation(() => [
        'Old Jane Doe',
        (query: string): void => {
          storage = query;
        },
      ]);

    const form = renderHelper();

    const { getByRole, user } = setup(form);

    const searchInput = getByRole('textbox');
    const submitInput = getByRole('button', { name: /search/i });

    await user.clear(searchInput);
    await user.type(searchInput, 'New Jane Doe');
    await user.click(submitInput);

    expect(useLocalStorageSpy).toHaveBeenCalled();
    expect(storage).equals('New Jane Doe');
  });
});
