import { render, screen } from '@testing-library/react';
import { JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { expect, MockedFunction, MockInstance, test, vi } from 'vitest';

import { setup } from '@/__tests__/test-utils/user-event-setup';
import { SearchForm } from '@/components';
import * as hooks from '@/hooks/use-local-storage';

const renderHelper = (): JSX.Element => {
  return (
    <BrowserRouter>
      <SearchForm />
    </BrowserRouter>
  );
};

describe('Rendering Tests', () => {
  const savedSearchQuery = 'Jane Doe';
  let mock: MockedFunction<
    (initialValue: string) => [string, (nextState: string) => void]
  >;
  beforeEach(() => {
    localStorage.clear();
    vi.mock('@/hooks/use-local-storage');
  });
  afterEach(() => {
    mock.mockReset();
  });

  it('renders search inputs', () => {
    mock = vi.mocked(hooks.useLocalStorage).mockReturnValue([
      savedSearchQuery,
      (_: string): void => {
        // do nothing
      },
    ]);
    render(renderHelper());

    const searchInput = screen.getAllByRole('textbox');
    const submitInput = screen.getByRole('button', { name: /search/i });

    expect(searchInput).toHaveLength(1);
    expect(submitInput).toBeInTheDocument();
  });

  it('displays previously saved search term from localStorage on mount', () => {
    mock = vi.mocked(hooks.useLocalStorage).mockReturnValue([
      savedSearchQuery,
      (_: string): void => {
        // do nothing
      },
    ]);
    render(renderHelper());

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toHaveValue(savedSearchQuery);
  });

  test('should show empty input when no saved term exists', () => {
    mock = vi.mocked(hooks.useLocalStorage).mockReturnValue([
      '',
      (_: string): void => {
        // do nothing
      },
    ]);
    render(renderHelper());

    const searchInput = screen.getByRole('textbox');

    expect(searchInput).toHaveValue('');
  });
});

describe('User Interaction Tests', () => {
  let storage = '';
  let useLocalStorageSpy: MockInstance<
    (initialValue: string) => [string, (nextState: string) => void]
  >;
  beforeEach(() => {
    localStorage.clear();
    vi.mock('@/hooks/use-local-storage');
    storage = '';
    useLocalStorageSpy = vi
      .spyOn(hooks, 'useLocalStorage')
      .mockImplementation(() => [
        '',
        (query: string): void => {
          storage = query;
        },
      ]);
  });

  afterEach(() => {
    useLocalStorageSpy.mockReset();
  });

  it('updates input value when user types', async () => {
    const form = renderHelper();

    const { getByRole, user } = setup(form);
    const searchInput = getByRole('textbox');
    await user.type(searchInput, 'test value');

    expect(searchInput).toHaveValue('test value');
  });

  it('saves search term to localStorage when search button is clicked', async () => {
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
    useLocalStorageSpy = vi
      .spyOn(hooks, 'useLocalStorage')
      .mockImplementation(() => [
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
  let getSearchQueryMock: MockedFunction<
    (initialValue: string) => [string, (nextState: string) => void]
  >;
  let useLocalStorageSpy: MockInstance<
    (initialValue: string) => [string, (nextState: string) => void]
  >;
  beforeAll(() => {
    vi.mock('@/hooks/use-local-storage');
  });
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    if (getSearchQueryMock !== undefined) {
      getSearchQueryMock.mockReset();
    }
    if (useLocalStorageSpy !== undefined) {
      useLocalStorageSpy.mockReset();
    }
  });

  it('retrieves saved search term on component mount', () => {
    const savedSearchQuery = 'Jane Doe';
    getSearchQueryMock = vi.mocked(hooks.useLocalStorage).mockReturnValue([
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
    useLocalStorageSpy = vi
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
