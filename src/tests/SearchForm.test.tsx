import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import SearchForm from '../components/searchForm/SearchForm.tsx';
import { searchQueryStorage } from '../services/LocalStorage';

import { setup } from './UserEventSetup';

describe('Search Component tests', () => {
  const mockUpdateCartsCallback = vi.fn();

  test('should render search inputs', () => {
    render(<SearchForm updateCartsCallback={mockUpdateCartsCallback} />);

    const searchInput = screen.getAllByRole('textbox');
    const submitInput = screen.getByRole('button', { name: /search/i });

    expect(searchInput).toHaveLength(1);
    expect(submitInput).toBeInTheDocument();
  });

  test('should search term to localStorage when search button is clicked', async () => {
    const setSearchQuerySpy = vi.spyOn(searchQueryStorage, 'setSearchQuery');

    const { user, getByRole } = setup(
      <SearchForm updateCartsCallback={mockUpdateCartsCallback} />,
    );

    const searchInput = getByRole('textbox');
    const submitInput = getByRole('button', { name: /search/i });

    await user.clear(searchInput);
    await user.type(searchInput, 'test query');
    await user.click(submitInput);

    expect(setSearchQuerySpy).toHaveBeenCalledWith('test query');
  });

  test('should retrieve saved search term on component mount', () => {
    const savedSearchQuery = 'Jane Doe';

    vi.spyOn(searchQueryStorage, 'getSearchQuery').mockReturnValue(
      savedSearchQuery,
    );

    render(<SearchForm updateCartsCallback={mockUpdateCartsCallback} />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue(savedSearchQuery);
  });
});
