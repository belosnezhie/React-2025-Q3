import { fireEvent, screen, waitFor } from '@testing-library/react';
import { HttpResponse, delay, http } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest';

import { testCharactersSearchArr } from '../../components/main/TestData';
import { renderWithProviders } from '../../TestUtils.tsx';

import MainPage from './MainPage.tsx';

let unmount = () => {};

export const handlers = [
  http.get('https://swapi.dev/api/people/?page=1', async () => {
    await delay(150);

    return HttpResponse.json(testCharactersSearchArr);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  unmount();
});

afterAll(() => server.close());

test('Check that a loading indicator is displayed while fetching default data', () => {
  const renderObject = renderWithProviders(
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  const spinner = screen.getByTestId('spinner_test');

  expect(spinner).toBeDefined();
});

test('Check that cards are displayed after fetching data', async () => {
  const renderObject = renderWithProviders(
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  await waitFor(() => {
    expect(screen.getAllByTestId('results_card')).toBeDefined();
  });

  const cards = screen.getAllByTestId('results_card');

  expect(cards).lengthOf(2);
});

test('Check that flyout is displayed after adding to favorites', async () => {
  global.URL.createObjectURL = vi.fn();

  const renderObject = renderWithProviders(
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  await waitFor(() => {
    expect(screen.getAllByTestId('results_card')).toBeDefined();

    const favButtons = screen.getAllByTestId('fav_button');

    favButtons.forEach((button) => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId('flyout')).toBeDefined();
  });
});
