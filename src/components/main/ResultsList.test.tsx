import { screen, waitFor } from '@testing-library/react';
import { HttpResponse, delay, http } from 'msw';
import { SetupServerApi, setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { afterAll, afterEach, expect, test } from 'vitest';

import { renderWithProviders } from '../../TestUtils';

import ResultsList from './ResultsList';
import { testCharactersSearchArr } from './TestData';

let unmount = () => {};

let server: SetupServerApi = setupServer();

afterEach(() => {
  server.resetHandlers();
  unmount();
  server.close();
});

afterAll(() => server.close());

test('should Verify that the component renders the specified number of cards', async () => {
  const handlers = [
    http.get('https://swapi.dev/api/people/?page=1', async () => {
      await delay(150);

      return HttpResponse.json(testCharactersSearchArr);
    }),
  ];

  server = setupServer(...handlers);

  server.listen();

  const renderObject = renderWithProviders(
    <BrowserRouter>
      <ResultsList />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  await waitFor(() => {
    const cards = screen.getAllByTestId('results_card');

    expect(cards).lengthOf(2);
  });
});
