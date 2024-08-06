import { fireEvent, screen, waitFor } from '@testing-library/react';
import { HttpResponse, delay, http } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';

import useLocalStorage from '../../hooks/UseLocalStorage';
import { renderWithProviders } from '../../TestUtils';
import { testCharactersSearchArr } from '../main/TestData';

import SearchForm from './SearchForm';

let unmount = () => {};

let callCounter = 0;

export const handlers = [
  http.get(
    'https://swapi.dev/api/people/?search=Jane&format=json&page=1',
    async () => {
      await delay(150);

      callCounter++;

      return HttpResponse.json(testCharactersSearchArr);
    },
  ),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  unmount();
});

afterAll(() => server.close());

test('should save the input value to the local storage after clicking search button', async () => {
  const renderObject = renderWithProviders(
    <BrowserRouter>
      <SearchForm />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  const textInput = screen.getByTestId('search_input');
  const form = screen.getByTestId('search_form');

  fireEvent.change(textInput, { target: { value: 'Jane' } });
  fireEvent.submit(form);

  await waitFor(() => {
    expect(callCounter).toEqual(1);
  });
});

test('should retrieve the value from the local storage upon mounting', () => {
  const { setItemToLS } = useLocalStorage();

  setItemToLS('1234');

  const renderObject = renderWithProviders(
    <BrowserRouter>
      <SearchForm />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  const textInput = screen.getByTestId('search_input');

  expect(textInput.getAttribute('value')).toEqual('1234');
});
