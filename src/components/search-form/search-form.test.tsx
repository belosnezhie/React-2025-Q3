import { render, screen } from '@testing-library/react';
import { JSX } from 'react';
import { expect, test, vi } from 'vitest';

import { SearchForm } from '@/components';
import { SearchQueryStorage } from '@/services/local-storage';
import { setup } from '@/test-utils/user-event-setup';

const renderHelper = (
  storage: SearchQueryStorage,
  callback: () => Promise<void>,
): JSX.Element => {
  return <SearchForm storage={storage} updateCartsCallback={callback} />;
};

describe('Rendering Tests', () => {
  let mockUpdateCartsCallback: () => Promise<void>;

  beforeEach(() => {
    mockUpdateCartsCallback = vi.fn();
    localStorage.clear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should render search inputs', () => {
    render(renderHelper(new SearchQueryStorage(), mockUpdateCartsCallback));

    const searchInput = screen.getAllByRole('textbox');
    const submitInput = screen.getByRole('button', { name: /search/i });

    expect(searchInput).toHaveLength(1);
    expect(submitInput).toBeInTheDocument();
  });

  test('should display previously saved search term from localStorage on mount', () => {
    const searchQueryStorage = new SearchQueryStorage();
    const savedSearchQuery = 'Jane Doe';

    using getSearchQuerySpy = vi
      .spyOn(searchQueryStorage, 'getSearchQuery')
      .mockReturnValue(savedSearchQuery);

    render(renderHelper(searchQueryStorage, mockUpdateCartsCallback));

    const searchInput = screen.getByRole('textbox');

    expect(getSearchQuerySpy).toHaveBeenCalled();
    expect(searchInput).toHaveValue(savedSearchQuery);
  });

  test('should show empty input when no saved term exists', () => {
    render(renderHelper(new SearchQueryStorage(), mockUpdateCartsCallback));

    const searchInput = screen.getByRole('textbox');

    expect(searchInput).toHaveValue('');
  });
});

describe('User Interaction Tests', () => {
  let mockCallback: () => Promise<void>;

  beforeEach(() => {
    mockCallback = vi.fn();
    localStorage.clear();
  });

  afterEach(() => vi.restoreAllMocks());
  test('should update input value when user types', async () => {
    const form = renderHelper(new SearchQueryStorage(), mockCallback);

    const { getByRole, user } = setup(form);
    const searchInput = getByRole('textbox');
    await user.type(searchInput, 'test value');

    expect(searchInput).toHaveValue('test value');
  });

  test('should save search term to localStorage when search button is clicked', async () => {
    const searchQueryStorage = new SearchQueryStorage();

    using setSearchQuerySpy = vi.spyOn(searchQueryStorage, 'setSearchQuery');

    const form = renderHelper(searchQueryStorage, mockCallback);

    const { getByRole, user } = setup(form);

    const searchInput = getByRole('textbox');
    const submitInput = getByRole('button', { name: /search/i });

    await user.clear(searchInput);
    await user.type(searchInput, 'test query');
    await user.click(submitInput);

    expect(setSearchQuerySpy).toHaveBeenCalledWith('test query');
  });

  test('should trim whitespace from search input before saving and trigger search callback with correct parameters', async () => {
    const searchQueryStorage = new SearchQueryStorage();

    using setSearchQuerySpy = vi.spyOn(searchQueryStorage, 'setSearchQuery');

    const form = renderHelper(searchQueryStorage, mockCallback);

    const { getByRole, user } = setup(form);

    const searchInput = getByRole('textbox');
    const submitInput = getByRole('button', { name: /search/i });

    await user.type(searchInput, ' trim  ');
    await user.click(submitInput);

    expect(setSearchQuerySpy).toHaveBeenCalledWith('trim');
    expect(mockCallback).toHaveBeenCalledWith('trim');
  });
});

describe('LocalStorage Integration', () => {
  let mockCallback: () => Promise<void>;

  beforeEach(() => {
    mockCallback = vi.fn();
    localStorage.clear();
  });
  afterEach(() => vi.restoreAllMocks());

  test('should retrieve saved search term on component mount', () => {
    const searchQueryStorage = new SearchQueryStorage();
    const savedSearchQuery = 'Jane Doe';

    using getSearchQuerySpy = vi
      .spyOn(searchQueryStorage, 'getSearchQuery')
      .mockReturnValue(savedSearchQuery);

    render(renderHelper(searchQueryStorage, mockCallback));

    const searchInput = screen.getByRole('textbox');

    expect(searchInput).toHaveValue(savedSearchQuery);
    expect(getSearchQuerySpy).toHaveBeenCalled();
  });

  test('should overwrite existing localStorage value when new search is performed', async () => {
    const searchQueryStorage = new SearchQueryStorage();
    const savedSearchQuery = 'Old Jane Doe';

    using getSearchQuerySpy = vi
      .spyOn(searchQueryStorage, 'getSearchQuery')
      .mockReturnValue(savedSearchQuery);
    using setSearchQuerySpy = vi.spyOn(searchQueryStorage, 'setSearchQuery');

    const form = renderHelper(searchQueryStorage, mockCallback);

    const { getByRole, user } = setup(form);

    const searchInput = getByRole('textbox');
    const submitInput = getByRole('button', { name: /search/i });

    await user.clear(searchInput);
    await user.type(searchInput, 'New Jane Doe');
    await user.click(submitInput);

    expect(getSearchQuerySpy).toHaveBeenCalled();
    expect(setSearchQuerySpy).toHaveBeenCalledWith('New Jane Doe');
  });
});
