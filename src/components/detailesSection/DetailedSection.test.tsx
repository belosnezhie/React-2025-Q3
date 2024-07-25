import { fireEvent, screen, waitFor } from '@testing-library/react';
import { HttpResponse, delay, http } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';

import { testCharactersSearchArr } from '../../components/main/TestData';
import { renderWithProviders } from '../../TestUtils.tsx';

import DetailedSection from './DetailedSection.tsx';

let unmount = () => {};

export const handlers = [
  http.get('https://swapi.dev/api/people/?search=*&format=json', async () => {
    await delay(150);

    return HttpResponse.json(testCharactersSearchArr);
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
  server.resetHandlers();
  unmount();
});

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test('Check that a loading indicator is displayed while fetching data', () => {
  const renderObject = renderWithProviders(
    <BrowserRouter>
      <DetailedSection />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  const spinner = screen.getByTestId('spinner_test');

  expect(spinner).toBeDefined();
});

test('Should close component after click on button', async () => {
  const renderObject = renderWithProviders(
    <BrowserRouter>
      <DetailedSection />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  await waitFor(() => {
    expect(screen.getByText('X')).toBeDefined();
  });

  const button = screen.getByText('X');

  fireEvent.click(button);

  expect(renderObject.container.children.length).toEqual(0);
});

test('Should correctly display the detailed card data', async () => {
  const renderObject = renderWithProviders(
    <BrowserRouter>
      <DetailedSection />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  await waitFor(() => {
    const page = screen.getByTestId('detailed_page');

    expect(page.children).lengthOf(7);
  });
});
