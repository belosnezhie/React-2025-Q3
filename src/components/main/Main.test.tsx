import { createRemixStub } from '@remix-run/testing';
import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';

import { testCharactersSearchArr } from '../../components/main/TestData';
import { ThemeProvider } from '../../context/ThemeContext';
import { clearFavorites } from '../../store/favoriteCharacterSlice/FavoriteCharacterSlice';
import { store } from '../../store/Store';
import { renderWithProviders } from '../../TestUtils';

import MainPage from './Main';

beforeEach(() => {
  global.URL.createObjectURL = vi.fn(() => 'details');

  vi.stubGlobal(
    'URL.createObjectURL',
    vi.fn(() => {}),
  );

  function ThemedMainPage() {
    return (
      <ThemeProvider>
        <MainPage />
      </ThemeProvider>
    );
  }

  const MainPageStub = createRemixStub([
    {
      path: '/',
      Component: ThemedMainPage,
      loader() {
        return testCharactersSearchArr;
      },
    },
  ]);

  renderWithProviders(<MainPageStub />);

  store.dispatch(clearFavorites());
});

test('Cards should be displayed on the Root page', async () => {
  const cards = await screen.findAllByTestId('results_card');

  expect(cards).lengthOf(testCharactersSearchArr.count);
});

test('Favorite card click should add favorite card to the store', async () => {
  const favButtons = await screen.findAllByTestId('fav_button');

  fireEvent.click(favButtons[0]);

  expect(store.getState().favoriteCharacters.favCharacters).lengthOf(1);
});

test('Remove all should hide Flyout component', async () => {
  const favButtons = await screen.findAllByTestId('fav_button');

  fireEvent.click(favButtons[0]);

  expect(store.getState().favoriteCharacters.favCharacters).lengthOf(1);

  fireEvent.click(favButtons[0]);

  expect(store.getState().favoriteCharacters.favCharacters).lengthOf(0);
});

test('Theme', async () => {
  const wrapperBefore = await screen.findByTestId('wrapper');

  expect(wrapperBefore.getAttribute('class')).contains('light');

  const themeSwitcher = await screen.findByTestId('theme_switcher');

  fireEvent.click(themeSwitcher);

  const wrapperAfter = await screen.findByTestId('wrapper');

  expect(wrapperAfter.getAttribute('class')).contains('dark');
});
